try {
  (process as unknown as { loadEnvFile?: (path: string) => void }).loadEnvFile?.(".env.local");
} catch {
  // No .env.local, or the variables were already passed in by the shell.
}

import {
  ApplicationIntegrationType,
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  InteractionContextType,
  MessageFlags,
  Partials,
  SlashCommandBuilder,
  ThreadAutoArchiveDuration,
  WebhookClient,
  type Attachment,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  type Interaction,
  type Message,
  type MessageCreateOptions,
  type ModalSubmitInteraction,
  type TextChannel,
  type ThreadChannel,
  type Typing,
  type User,
  type Webhook,
} from "discord.js";
import {
  IDS,
  STATUS_LABELS,
  buildAdminBriefCard,
  buildAdminIntroCard,
  buildAdminNote,
  buildAutomatedAnswer,
  buildBriefFailedNotice,
  buildBriefReceipt,
  buildBriefSentNotice,
  buildDmWelcome,
  buildHumanReply,
  buildNotice,
  buildStatusNotice,
  buildStudioStatus,
  escapeMarkdown,
  formatBriefNo,
  parseStatusButtonId,
  splitText,
  type ClientRef,
  type ConversationStatus,
  type LinkRef,
  type MediaRef,
} from "../src/lib/discord-messages.ts";
import { buildBriefModal, readBriefSubmission } from "./discord/brief-form.ts";
import { lookupRobloxGame } from "./discord/roblox.ts";
import {
  activeBriefCount,
  addBrief,
  findConversationByThread,
  flushStore,
  getConversation,
  nextBriefNo,
  saveConversation,
  upsertConversation,
  type Conversation,
  type StoredBrief,
} from "./discord/store.ts";

/**
 * Cerbis relay bot.
 *
 *   /brief   opens the commission form and files it into the client's private thread
 *   /status  availability, turnaround and handoff
 *   DMs      are mirrored into the client's thread, under their own name and avatar
 *   Thread   replies go back to the client's DM; `//` notes stay in the thread
 *
 * Which thread belongs to which client lives in .data/discord-relay.json, so a
 * restart no longer strands conversations.
 *
 * Admin channel permissions the bot needs: View Channel, Send Messages, Create
 * Public Threads, Send Messages in Threads, Manage Threads, Attach Files, and
 * Manage Webhooks (optional, for showing clients under their own name).
 */

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const ADMIN_CHANNEL_ID = process.env.DISCORD_ADMIN_CHANNEL_ID;
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const ADMIN_USER_IDS = new Set(
  (process.env.DISCORD_ADMIN_USER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean),
);

/** A client who has been quiet this long gets the welcome message again. */
const GREETING_GAP_MS = 12 * 60 * 60 * 1000;
const BRIEF_COOLDOWN_MS = 30 * 1000;
const TYPING_RELAY_GAP_MS = 8 * 1000;
/** Bots can upload 10 MiB per file outside boosted servers. */
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = 25 * 1024 * 1024;

if (!BOT_TOKEN) {
  console.error("❌ DISCORD_BOT_TOKEN is missing. Set it in .env.local.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
  // Client text is relayed into a server; nothing it contains should ping anyone.
  allowedMentions: { parse: [] },
});

/* ---------------------------------------------------------------------------
   Small helpers
   --------------------------------------------------------------------------- */

type FileLike = Pick<Attachment, "url" | "name" | "size" | "contentType">;

const isAdmin = (userId: string) => ADMIN_USER_IDS.size === 0 || ADMIN_USER_IDS.has(userId);

const profileOf = (user: User) => ({
  id: user.id,
  name: user.displayName,
  avatarUrl: user.displayAvatarURL({ size: 256 }),
});

const clientRef = (conversation: Conversation): ClientRef => ({
  id: conversation.userId,
  name: conversation.userName,
  avatarUrl: conversation.avatarUrl,
});

/** Webhook names may not contain "discord" or "clyde". */
const webhookName = (name: string) => (name.replace(/discord|clyde/gi, "").trim() || "Client").slice(0, 80);

const toLink = (file: FileLike): LinkRef => ({ name: file.name, url: file.url });

function errorCode(err: unknown) {
  return typeof err === "object" && err !== null && "code" in err ? (err as { code: unknown }).code : undefined;
}

function whyUndelivered(err: unknown) {
  switch (errorCode(err)) {
    case 50007:
      return "their DMs are closed to apps";
    case 10013:
      return "that account no longer exists";
    case 40005:
      return "the files are too large";
    default:
      return err instanceof Error ? err.message : "unknown error";
  }
}

/** Re-uploads files (attachment CDN links expire) and records how to reference them. */
function prepareFiles(attachments: readonly FileLike[]) {
  const files: { attachment: string; name: string }[] = [];
  const media: MediaRef[] = [];
  const oversized: LinkRef[] = [];
  let total = 0;

  attachments.forEach((file, index) => {
    if (file.size > MAX_FILE_BYTES || total + file.size > MAX_REQUEST_BYTES) {
      oversized.push(toLink(file));
      return;
    }
    total += file.size;
    const name = `${index + 1}-${file.name.replace(/[^\w.-]+/g, "_").slice(-80)}`;
    const image = file.contentType
      ? /^image\/(png|jpe?g|gif|webp)$/i.test(file.contentType)
      : /\.(png|jpe?g|gif|webp)$/i.test(file.name);
    files.push({ attachment: file.url, name });
    media.push({ url: `attachment://${name}`, image });
  });

  return { files, media, oversized };
}

type DmResult = { ok: true; message: Message } | { ok: false; reason: string };

async function sendDm(userId: string, payloads: MessageCreateOptions | MessageCreateOptions[]): Promise<DmResult> {
  try {
    const user = await client.users.fetch(userId);
    let last: Message | null = null;
    for (const payload of Array.isArray(payloads) ? payloads : [payloads]) {
      last = await user.send(payload);
    }
    return last ? { ok: true, message: last } : { ok: false, reason: "nothing to send" };
  } catch (err) {
    return { ok: false, reason: whyUndelivered(err) };
  }
}

let fallbackWebhook: WebhookClient | null = null;

function getFallbackWebhook() {
  if (!WEBHOOK_URL) return null;
  fallbackWebhook ??= new WebhookClient({ url: WEBHOOK_URL }, { allowedMentions: { parse: [] } });
  return fallbackWebhook;
}

/* ---------------------------------------------------------------------------
   Admin channel and client threads
   --------------------------------------------------------------------------- */

async function getAdminChannel(): Promise<TextChannel | null> {
  if (!ADMIN_CHANNEL_ID) return null;
  try {
    const channel = await client.channels.fetch(ADMIN_CHANNEL_ID);
    if (channel?.type === ChannelType.GuildText) return channel;
    console.warn(`⚠️ DISCORD_ADMIN_CHANNEL_ID (${ADMIN_CHANNEL_ID}) is not a text channel.`);
  } catch (err) {
    console.warn("⚠️ Can't reach the admin channel:", (err as Error).message);
  }
  return null;
}

async function fetchThread(threadId: string): Promise<ThreadChannel | null> {
  try {
    const channel = await client.channels.fetch(threadId);
    if (!channel?.isThread()) return null;
    if (channel.archived && !channel.locked) await channel.setArchived(false, "New relay activity");
    return channel;
  } catch {
    return null;
  }
}

/** The client's thread, created if it doesn't exist or was deleted. */
async function openThread(
  conversation: Conversation,
  reason: string,
): Promise<{ thread: ThreadChannel; created: boolean } | null> {
  if (conversation.threadId) {
    const existing = await fetchThread(conversation.threadId);
    if (existing) return { thread: existing, created: false };
  }

  const channel = await getAdminChannel();
  if (!channel) return null;

  try {
    const name = conversation.userName.replace(/\s+/g, " ").trim().slice(0, 80) || "client";
    const thread = await channel.threads.create({
      name: `${name} · ${conversation.userId.slice(-4)}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
      reason,
    });
    conversation.threadId = thread.id;
    conversation.introMessageId = undefined;
    saveConversation(conversation);
    return { thread, created: true };
  } catch (err) {
    console.warn("⚠️ Couldn't open a client thread:", (err as Error).message);
    return null;
  }
}

const channelWebhooks = new Map<string, Promise<Webhook | null>>();

/** A bot-owned webhook on the admin channel, used to post as the client. */
function getThreadWebhook(thread: ThreadChannel): Promise<Webhook | null> {
  const parent = thread.parent;
  if (parent?.type !== ChannelType.GuildText) return Promise.resolve(null);

  let pending = channelWebhooks.get(parent.id);
  if (!pending) {
    pending = (async () => {
      try {
        const hooks = await parent.fetchWebhooks();
        const own = hooks.find((hook) => hook.owner?.id === client.user?.id && hook.token);
        return own ?? (await parent.createWebhook({ name: "Cerbis Relay", reason: "Show clients under their own name" }));
      } catch (err) {
        console.warn("⚠️ No Manage Webhooks in the admin channel; client messages will be posted by the bot.", (err as Error).message);
        return null;
      }
    })();
    channelWebhooks.set(parent.id, pending);
  }
  return pending;
}

/* ---------------------------------------------------------------------------
   Briefs
   --------------------------------------------------------------------------- */

function briefCooldown(conversation: Conversation | undefined) {
  return conversation?.lastBriefAt ? conversation.lastBriefAt + BRIEF_COOLDOWN_MS - Date.now() : 0;
}

function cooldownNotice(waitMs: number) {
  const at = Math.floor((Date.now() + waitMs) / 1000);
  return buildNotice("One moment", `You just sent a brief. You can send another <t:${at}:R>.`);
}

/**
 * Posts the brief card. Tries the client's thread first, then the fallback
 * webhook; each with files re-uploaded, then with files as links if the upload
 * is what failed. Returns where it landed.
 */
async function fileBrief(conversation: Conversation, brief: StoredBrief, uploads: FileLike[]) {
  const prepared = prepareFiles(uploads);
  const variants = [{ files: prepared.files, media: prepared.media, oversized: prepared.oversized }];
  if (prepared.files.length) variants.push({ files: [], media: [], oversized: uploads.map(toLink) });

  const opened = await openThread(conversation, `Brief ${formatBriefNo(brief.no)} from ${conversation.userName}`);
  if (opened) {
    for (const variant of variants) {
      Object.assign(brief, { media: variant.media, oversized: variant.oversized });
      try {
        const sent = await opened.thread.send({
          components: buildAdminBriefCard({ client: clientRef(conversation), brief, status: conversation.status, interactive: true }),
          files: variant.files,
          flags: MessageFlags.IsComponentsV2,
        });
        brief.messageId = sent.id;
        return "thread" as const;
      } catch (err) {
        console.error(`Posting brief ${formatBriefNo(brief.no)} to its thread failed:`, err);
      }
    }
  }

  const webhook = getFallbackWebhook();
  if (webhook) {
    for (const variant of variants) {
      Object.assign(brief, { media: variant.media, oversized: variant.oversized });
      try {
        await webhook.send({
          components: buildAdminBriefCard({ client: clientRef(conversation), brief, status: conversation.status, interactive: false }),
          files: variant.files,
          flags: MessageFlags.IsComponentsV2,
          withComponents: true,
          username: webhookName(conversation.userName),
          avatarURL: conversation.avatarUrl,
        });
        console.warn(`⚠️ Brief ${formatBriefNo(brief.no)} went to the webhook; thread replies won't reach this client.`);
        return "webhook" as const;
      } catch (err) {
        console.error(`Posting brief ${formatBriefNo(brief.no)} to the webhook failed:`, err);
      }
    }
  }

  return null;
}

async function openBriefForm(interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const conversation = getConversation(interaction.user.id);
  const wait = briefCooldown(conversation);
  if (wait > 0) {
    await interaction.reply({
      components: cooldownNotice(wait),
      flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
    });
    return;
  }
  await interaction.showModal(buildBriefModal({ game: conversation?.lastGame }));
}

async function submitBrief(interaction: ModalSubmitInteraction) {
  // In the bot DM the receipt is the permanent record, so it isn't ephemeral.
  const inBotDm = interaction.context === InteractionContextType.BotDM;
  await interaction.deferReply(inBotDm ? {} : { flags: MessageFlags.Ephemeral });

  const conversation = upsertConversation(profileOf(interaction.user));
  const wait = briefCooldown(conversation);
  if (wait > 0) {
    await interaction.editReply({ components: cooldownNotice(wait), flags: MessageFlags.IsComponentsV2 });
    return;
  }

  const submission = readBriefSubmission(interaction);
  const brief: StoredBrief = {
    no: nextBriefNo(),
    game: submission.game,
    screens: submission.screens,
    budget: submission.budget,
    details: submission.details,
    references: submission.files.length,
    submittedAt: Date.now(),
    roblox: await lookupRobloxGame(submission.game),
  };

  if (conversation.status === "closed") conversation.status = "open";
  const destination = await fileBrief(conversation, brief, submission.files);
  if (!destination) {
    await interaction.editReply({ components: buildBriefFailedNotice(brief), flags: MessageFlags.IsComponentsV2 });
    return;
  }

  addBrief(conversation, brief);
  conversation.lastClientMessageAt = Date.now();
  saveConversation(conversation);
  console.log(`📨 Brief ${formatBriefNo(brief.no)} from ${conversation.userName} → ${destination}`);

  const receipt = buildBriefReceipt(brief, interaction.user.displayName);
  if (inBotDm) {
    await interaction.editReply({ components: receipt, flags: MessageFlags.IsComponentsV2 });
    return;
  }

  const dm = await sendDm(interaction.user.id, { components: receipt, flags: MessageFlags.IsComponentsV2 });
  await interaction.editReply({
    components: buildBriefSentNotice(brief, dm.ok ? dm.message.url : null),
    flags: MessageFlags.IsComponentsV2,
  });
}

/* ---------------------------------------------------------------------------
   Status buttons on admin cards
   --------------------------------------------------------------------------- */

async function changeStatus(interaction: ButtonInteraction, target: { status: ConversationStatus; userId: string }) {
  if (!isAdmin(interaction.user.id)) {
    await interaction.reply({
      components: buildNotice("Not yours to change", "Only Cerbis can change the status of a brief."),
      flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
    });
    return;
  }

  const conversation = getConversation(target.userId);
  if (!conversation) {
    await interaction.reply({
      components: buildNotice("Nothing to update", "This client isn't in the relay store any more."),
      flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
    });
    return;
  }

  const previous = conversation.status;
  conversation.status = target.status;
  saveConversation(conversation);

  const brief = conversation.briefs.find((b) => b.messageId === interaction.message.id);
  const card = brief
    ? buildAdminBriefCard({ client: clientRef(conversation), brief, status: conversation.status, interactive: true })
    : interaction.message.id === conversation.introMessageId
      ? buildAdminIntroCard({ client: clientRef(conversation), status: conversation.status })
      : null;

  try {
    if (card) await interaction.update({ components: card });
    else await interaction.deferUpdate();
  } catch (err) {
    console.warn("Couldn't redraw the card:", (err as Error).message);
    if (!interaction.deferred && !interaction.replied) await interaction.deferUpdate().catch(() => {});
  }

  let outcome = "";
  if (previous !== conversation.status && conversation.status !== "open") {
    const latest = brief ?? conversation.briefs.at(-1);
    const dm = await sendDm(conversation.userId, {
      components: buildStatusNotice(conversation.status, latest?.no),
      flags: MessageFlags.IsComponentsV2,
    });
    outcome = dm.ok ? " · client notified" : ` · client not notified (${dm.reason})`;
  }

  await interaction.followUp({
    components: buildAdminNote(
      `${escapeMarkdown(interaction.user.displayName)} set this to ${STATUS_LABELS[conversation.status]}${outcome}`,
    ),
    flags: MessageFlags.IsComponentsV2,
  });

  if (conversation.status === "closed" && interaction.channel?.isThread()) {
    await interaction.channel.setArchived(true, "Closed from the brief card").catch(() => {});
  }
}

/* ---------------------------------------------------------------------------
   Client DMs → thread
   --------------------------------------------------------------------------- */

async function mirrorClientMessage(conversation: Conversation, message: Message, reopened: boolean) {
  const attachments = [...message.attachments.values()];
  const stickers = message.stickers.map((s) => `-# Sticker: ${escapeMarkdown(s.name)}`);
  const opened = await openThread(conversation, `Conversation with ${conversation.userName}`);

  if (!opened) {
    // No thread access: post to the fallback webhook so the message isn't lost.
    const webhook = getFallbackWebhook();
    if (!webhook) return false;
    const links = attachments.map((a) => `-# Attachment: [${escapeMarkdown(a.name)}](${a.url})`);
    const body = [message.content, ...stickers, ...links].filter(Boolean).join("\n") || "-# (empty message)";
    try {
      for (const chunk of splitText(body, 2000)) {
        await webhook.send({ content: chunk, username: webhookName(conversation.userName), avatarURL: conversation.avatarUrl });
      }
      return true;
    } catch (err) {
      console.error(`Relaying a DM from ${conversation.userName} to the webhook failed:`, err);
      return false;
    }
  }

  const { thread, created } = opened;
  const { files, oversized } = prepareFiles(attachments);
  const tooLarge = oversized.map((f) => `-# Too large to forward: [${escapeMarkdown(f.name)}](${f.url})`);
  const body = [message.content, ...stickers, ...tooLarge].filter(Boolean).join("\n");
  const chunks = splitText(body || (files.length ? "" : "-# (empty message)"), 1900);

  try {
    if (created) {
      const intro = await thread.send({
        components: buildAdminIntroCard({ client: clientRef(conversation), status: conversation.status }),
        flags: MessageFlags.IsComponentsV2,
      });
      conversation.introMessageId = intro.id;
      saveConversation(conversation);
    } else if (reopened) {
      await thread.send({ components: buildAdminNote("Reopened · the client wrote again"), flags: MessageFlags.IsComponentsV2 });
    }

    const webhook = await getThreadWebhook(thread);
    for (const [index, chunk] of chunks.entries()) {
      const last = index === chunks.length - 1;
      if (webhook) {
        await webhook.send({
          content: chunk || undefined,
          files: last ? files : [],
          threadId: thread.id,
          username: webhookName(conversation.userName),
          avatarURL: conversation.avatarUrl,
          allowedMentions: { parse: [] },
        });
      } else {
        const label = index === 0 ? `**${escapeMarkdown(conversation.userName)}**\n` : "";
        await thread.send({ content: `${label}${chunk}` || undefined, files: last ? files : [] });
      }
    }
    return true;
  } catch (err) {
    if (errorCode(err) === 10015) channelWebhooks.clear(); // webhook was deleted; recreate next time
    console.error(`Mirroring a DM from ${conversation.userName} failed:`, err);
    return false;
  }
}

async function relayClientMessage(message: Message) {
  const conversation = upsertConversation(profileOf(message.author));
  const now = Date.now();
  const greet = !conversation.lastClientMessageAt || now - conversation.lastClientMessageAt > GREETING_GAP_MS;
  const reopened = conversation.status === "closed";

  conversation.lastClientMessageAt = now;
  if (reopened) conversation.status = "open";
  saveConversation(conversation);

  if (!(await mirrorClientMessage(conversation, message, reopened))) {
    await message.react("⚠️").catch(() => {});
    await message
      .reply({
        components: buildNotice(
          "That didn't reach Cerbis",
          "The relay is having trouble right now. Try again in a bit, or message @Cerbi directly.",
          "error",
        ),
        flags: MessageFlags.IsComponentsV2,
      })
      .catch(() => {});
    return;
  }

  await message.react("✅").catch(() => {});
  if (greet) {
    await message.author.send({ components: buildDmWelcome(), flags: MessageFlags.IsComponentsV2 }).catch(() => {});
  }
}

/* ---------------------------------------------------------------------------
   Thread replies → client DM
   --------------------------------------------------------------------------- */

async function relayAdminReply(message: Message, thread: ThreadChannel) {
  const conversation = findConversationByThread(thread.id);
  if (!conversation || !isAdmin(message.author.id)) return;

  let body = message.content.trim();
  if (client.user) body = body.replaceAll(`<@${client.user.id}>`, "").replaceAll(`<@!${client.user.id}>`, "").trim();
  if (body.startsWith("//")) return; // private note, stays in the thread

  const automated = /^!ai\b/i.test(body);
  if (automated) body = body.replace(/^!ai\b\s*/i, "");

  const attachments = [...message.attachments.values()];
  if (!body && attachments.length === 0) return;

  const { files, media, oversized } = prepareFiles(attachments);
  const chunks = splitText(body, 3800);
  const payloads = chunks.map((chunk, index): MessageCreateOptions => {
    const last = index === chunks.length - 1;
    const parts = { body: chunk, media: last ? media : [], continued: index > 0 };
    return {
      components: automated
        ? buildAutomatedAnswer(parts)
        : buildHumanReply({ ...parts, authorName: message.author.displayName }),
      files: last ? files : [],
      flags: MessageFlags.IsComponentsV2,
    };
  });

  const result = await sendDm(conversation.userId, payloads);
  if (result.ok) {
    await message.react("✅").catch(() => {});
    if (oversized.length) {
      const names = oversized.map((f) => escapeMarkdown(f.name)).join(", ");
      await message
        .reply({ components: buildAdminNote(`Not sent, over the upload limit: ${names}`), flags: MessageFlags.IsComponentsV2 })
        .catch(() => {});
    }
  } else {
    await message.react("⚠️").catch(() => {});
    await message
      .reply({ components: buildAdminNote(`Not delivered: ${result.reason}`), flags: MessageFlags.IsComponentsV2 })
      .catch(() => {});
  }
}

const lastTypingRelay = new Map<string, number>();

/** Shows "Cerbis is typing…" in the client's DM while a reply is being written. */
async function relayTyping(typing: Typing) {
  if (!typing.channel.isThread() || typing.user.bot || !isAdmin(typing.user.id)) return;
  const conversation = findConversationByThread(typing.channel.id);
  if (!conversation) return;

  const last = lastTypingRelay.get(conversation.userId) ?? 0;
  if (Date.now() - last < TYPING_RELAY_GAP_MS) return;
  lastTypingRelay.set(conversation.userId, Date.now());

  try {
    const user = await client.users.fetch(conversation.userId);
    await (await user.createDM()).sendTyping();
  } catch {
    // DMs closed; the reply itself will report that.
  }
}

/* ---------------------------------------------------------------------------
   Wiring
   --------------------------------------------------------------------------- */

async function registerCommands() {
  const everywhere = (builder: SlashCommandBuilder) =>
    builder
      .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
      .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel);

  const commands = [
    everywhere(new SlashCommandBuilder().setName("brief").setDescription("Send Cerbis a Roblox UI commission brief")),
    everywhere(new SlashCommandBuilder().setName("status").setDescription("See if Cerbis is taking work, and how it goes")),
  ].map((command) => command.toJSON());

  try {
    await client.application?.commands.set(commands);
    console.log("✅ Slash commands registered: /brief, /status");
  } catch (err) {
    console.error("⚠️ Failed to register slash commands:", err);
  }
}

function describeInteraction(interaction: Interaction) {
  if (interaction.isChatInputCommand()) return `/${interaction.commandName}`;
  if (interaction.isButton() || interaction.isModalSubmit()) return interaction.customId;
  return `interaction type ${interaction.type}`;
}

async function handleInteraction(interaction: Interaction) {
  try {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "brief") return await openBriefForm(interaction);
      if (interaction.commandName === "status") {
        return await interaction.reply({
          components: buildStudioStatus({
            activeBriefs: activeBriefCount(),
            avatarUrl: client.user?.displayAvatarURL({ size: 256 }),
          }),
          flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
        });
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === IDS.openBrief) return await openBriefForm(interaction);
      const target = parseStatusButtonId(interaction.customId);
      if (target) return await changeStatus(interaction, target);
    } else if (interaction.isModalSubmit() && interaction.customId === IDS.briefModal) {
      return await submitBrief(interaction);
    }
  } catch (err) {
    console.error(`${describeInteraction(interaction)} failed:`, err);
    if (!interaction.isRepliable()) return;
    const components = buildNotice(
      "Something broke on my end",
      "Try again in a minute. If it keeps happening, message @Cerbi directly.",
      "error",
    );
    if (interaction.deferred && !interaction.replied) {
      await interaction.editReply({ components, flags: MessageFlags.IsComponentsV2 }).catch(() => {});
    } else if (!interaction.replied) {
      await interaction.reply({ components, flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }).catch(() => {});
    }
  }
}

async function handleMessage(message: Message) {
  if (message.author.bot || message.webhookId || message.system) return;
  if (message.channel.type === ChannelType.DM) await relayClientMessage(message);
  else if (message.channel.isThread()) await relayAdminReply(message, message.channel);
}

client.once(Events.ClientReady, async (ready) => {
  console.log(`🤖 Cerbis relay online as ${ready.user.tag}`);
  const channel = await getAdminChannel();
  if (channel) console.log(`📥 Client threads open in #${channel.name}`);
  else if (WEBHOOK_URL) console.warn("⚠️ No admin channel access. Briefs go to the webhook, and thread replies are unavailable.");
  else console.warn("⚠️ No admin channel or webhook configured. Briefs have nowhere to go.");
  if (ADMIN_USER_IDS.size === 0) console.log("ℹ️ DISCORD_ADMIN_USER_IDS is empty, so anyone who can see a client thread can reply.");
  await registerCommands();
});

client.on(Events.InteractionCreate, (interaction) => void handleInteraction(interaction));
client.on(Events.MessageCreate, (message) => {
  handleMessage(message).catch((err) => console.error("Message handler failed:", err));
});
client.on(Events.TypingStart, (typing) => void relayTyping(typing));
client.on(Events.Error, (err) => console.error("Discord client error:", err));
process.on("unhandledRejection", (err) => console.error("Unhandled rejection:", err));

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    console.log("Shutting down, saving relay state…");
    try {
      flushStore();
    } finally {
      void client.destroy().finally(() => process.exit(0));
    }
  });
}

client.login(BOT_TOKEN).catch((err) => {
  console.error("❌ Failed to log in to Discord:", err);
  process.exit(1);
});
