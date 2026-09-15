try {
  if (typeof (process as unknown as { loadEnvFile?: (path: string) => void }).loadEnvFile === "function") {
    (process as unknown as { loadEnvFile: (path: string) => void }).loadEnvFile(".env.local");
  }
} catch {
  // .env.local may already be loaded via CLI flag
}

import {
  Client,
  GatewayIntentBits,
  Partials,
  ChannelType,
  EmbedBuilder,
  ThreadChannel,
  TextChannel,
  Message,
  REST,
  Routes,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";
import {
  buildAutomatedFirstResponseEmbed,
  buildHumanResponseEmbed,
  buildAiResponseEmbed,
  DISCORD_COLORS,
} from "../src/lib/discord-embeds.ts";

/**
 * Cerbis Discord Relay & Automated Response Bot
 *
 * Capabilities:
 * 1. Global User-App Slash Commands (/brief and /status).
 * 2. Instant [AUTOMATED] receipt embed delivered to client (ephemeral — only they see it).
 * 3. Relays user briefs to Cerbis's private Discord channel via webhook.
 * 4. When Cerbis replies in a thread, delivers a [HUMAN RESPONSE • Cerbis (Verified)] embed to the user.
 */

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "1549424708292837438";
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const ADMIN_CHANNEL_ID = process.env.DISCORD_ADMIN_CHANNEL_ID;
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

if (!BOT_TOKEN) {
  console.error("❌ DISCORD_BOT_TOKEN is missing in environment. Set it in .env.local.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

// Map user ID -> Thread ID in Cerbis's admin channel
const activeThreads = new Map<string, string>();
// Track if user received the automated first response in this session
const greetedUsers = new Set<string>();

/**
 * Register Global User-App Slash Commands
 */
async function registerSlashCommands() {
  try {
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN!);

    const briefCommand = new SlashCommandBuilder()
      .setName("brief")
      .setDescription("Send a Roblox UI commission brief directly to Cerbis")
      .addStringOption((opt) =>
        opt
          .setName("game")
          .setDescription("Roblox game link or title")
          .setRequired(true)
      )
      .addStringOption((opt) =>
        opt
          .setName("screens")
          .setDescription("Screens needed (e.g. Shop, HUD, Daily Rewards, Inventory)")
          .setRequired(true)
      )
      .addStringOption((opt) =>
        opt
          .setName("notes")
          .setDescription("Budget, timeline, or style reference")
          .setRequired(false)
      )
      .addAttachmentOption((opt) =>
        opt
          .setName("reference")
          .setDescription("Screenshot, mockup, or style reference image")
          .setRequired(false)
      )
      .setIntegrationTypes([0, 1]) // Guild & User Install
      .setContexts([0, 1, 2]); // Guild, Bot DM, Private Channels

    const statusCommand = new SlashCommandBuilder()
      .setName("status")
      .setDescription("Check Cerbis UI queue and commission availability")
      .setIntegrationTypes([0, 1])
      .setContexts([0, 1, 2]);

    console.log("⚡ Registering User-App slash commands (/brief, /status)...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: [briefCommand.toJSON(), statusCommand.toJSON()],
    });
    console.log("✅ Successfully registered slash commands globally for User App.");
  } catch (err) {
    console.error("⚠️ Failed to register slash commands:", err);
  }
}

/**
 * Relay brief/message to Cerbis's private channel via Webhook.
 * Webhooks don't require the bot to be a member of the guild.
 */
async function relayViaWebhook(
  userId: string,
  userName: string,
  userAvatar: string,
  summary: { game?: string; screens?: string; notes?: string; text?: string; imageUrl?: string }
) {
  if (!WEBHOOK_URL) {
    console.warn("⚠️ DISCORD_WEBHOOK_URL not set — cannot relay brief to admin channel.");
    return;
  }

  const fields: Array<{ name: string; value: string; inline?: boolean }> = [
    { name: "👤 Client", value: `${userName}`, inline: true },
    { name: "🆔 Discord ID", value: `\`${userId}\``, inline: true },
  ];

  if (summary.game) fields.push({ name: "🎮 Game", value: summary.game, inline: true });
  if (summary.screens) fields.push({ name: "📱 Screens", value: summary.screens, inline: false });
  if (summary.notes) fields.push({ name: "📝 Notes", value: summary.notes, inline: false });

  const embed = {
    title: `🎨 New Brief from ${userName}`,
    color: DISCORD_COLORS.ACCENT,
    thumbnail: { url: userAvatar },
    image: summary.imageUrl ? { url: summary.imageUrl } : undefined,
    description: summary.text || undefined,
    fields,
    footer: { text: "Cerbis Discord Relay • cerbis.xyz" },
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `📩 ${userName} (via Cerbis App)`,
        avatar_url: userAvatar,
        embeds: [embed],
      }),
    });

    if (!res.ok) {
      console.error(`Webhook relay failed (${res.status}):`, await res.text());
    } else {
      console.log(`✅ Relayed brief from ${userName} to admin channel via webhook.`);
    }
  } catch (err) {
    console.error("Failed to relay via webhook:", err);
  }
}

/**
 * Relay brief/message to Cerbis's private admin channel thread (requires bot in guild).
 * Falls back to webhook if channel access fails.
 */
async function relayToAdmin(
  userId: string,
  userName: string,
  userAvatar: string,
  summary: { game?: string; screens?: string; notes?: string; text?: string; imageUrl?: string }
) {
  // Try channel-based thread relay first (only works if bot is in the guild)
  if (ADMIN_CHANNEL_ID) {
    try {
      const adminChannel = await client.channels.fetch(ADMIN_CHANNEL_ID);
      if (adminChannel && adminChannel.isTextBased()) {
        const textChannel = adminChannel as TextChannel;
        let thread: ThreadChannel | null = null;

        const existingThreadId = activeThreads.get(userId);
        if (existingThreadId) {
          try {
            const fetched = await client.channels.fetch(existingThreadId);
            if (fetched && fetched.isThread()) {
              thread = fetched as ThreadChannel;
            }
          } catch {
            thread = null;
          }
        }

        if (!thread) {
          const cleanName = userName.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20) || "client";
          thread = await textChannel.threads.create({
            name: `💬・${cleanName}-${userId.slice(-4)}`,
            autoArchiveDuration: 1440,
            reason: `Client inquiry from ${userName} via Cerbis Discord App`,
          });
          activeThreads.set(userId, thread.id);

          const infoEmbed = new EmbedBuilder()
            .setTitle(`🎨 New Brief / Inquiry from ${userName}`)
            .setColor(DISCORD_COLORS.ACCENT)
            .setThumbnail(userAvatar)
            .addFields(
              { name: "👤 Client", value: `${userName} (<@${userId}>)`, inline: true },
              { name: "🆔 Discord ID", value: `\`${userId}\``, inline: true },
              {
                name: "💬 How to reply",
                value:
                  "Reply in this thread. Whatever you type will be delivered straight to the client's DM with your verified badge.",
                inline: false,
              }
            )
            .setTimestamp();

          await thread.send({ embeds: [infoEmbed] });
        }

        const detailEmbed = new EmbedBuilder()
          .setAuthor({ name: `${userName} (Client)`, iconURL: userAvatar })
          .setColor(0x2f3136)
          .setTimestamp();

        if (summary.game) detailEmbed.addFields({ name: "🎮 Game", value: summary.game, inline: true });
        if (summary.screens) detailEmbed.addFields({ name: "📱 Screens", value: summary.screens, inline: true });
        if (summary.notes) detailEmbed.addFields({ name: "📝 Notes", value: summary.notes, inline: false });
        if (summary.text) detailEmbed.setDescription(summary.text);
        if (summary.imageUrl) detailEmbed.setImage(summary.imageUrl);

        await thread.send({ embeds: [detailEmbed] });
        return; // Success — no need for webhook fallback
      }
    } catch (err) {
      console.warn("⚠️ Channel relay failed, falling back to webhook:", (err as Error).message);
    }
  }

  // Fallback: relay via webhook
  await relayViaWebhook(userId, userName, userAvatar, summary);
}

client.once("ready", async () => {
  console.log("==================================================");
  console.log(`🤖 Cerbis Discord Relay Bot is online as: ${client.user?.tag}`);
  if (GUILD_ID) {
    console.log(`🏠 Guild Target: ${GUILD_ID}`);
  }
  console.log(`📡 Ready to receive DMs, Slash Commands, and relay briefs.`);
  console.log("==================================================");

  await registerSlashCommands();
});

// -------------------------------------------------------------
// SCENARIO 1: User-App Slash Commands (/brief & /status)
// -------------------------------------------------------------
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const userName = interaction.user.displayName || interaction.user.username;
  const userId = interaction.user.id;
  const userAvatar = interaction.user.displayAvatarURL();

  if (commandName === "brief") {
    const game = interaction.options.getString("game", true);
    const screens = interaction.options.getString("screens", true);
    const notes = interaction.options.getString("notes") || undefined;
    const reference = interaction.options.getAttachment("reference");
    const imageUrl = reference?.url;

    // Send immediate automated receipt embed — only the sender sees it
    const firstResponse = buildAutomatedFirstResponseEmbed(userName, screens);
    await interaction.reply({
      embeds: [new EmbedBuilder(firstResponse)],
      flags: MessageFlags.Ephemeral,
    });

    // Relay to Cerbis's private channel (thread or webhook)
    await relayToAdmin(userId, userName, userAvatar, {
      game,
      screens,
      notes,
      imageUrl,
    });
  }

  if (commandName === "status") {
    const statusEmbed = new EmbedBuilder()
      .setTitle("🟢 Cerbis UI Studio — Status")
      .setColor(DISCORD_COLORS.HUMAN)
      .setDescription(
        "Cerbis is currently **open for Roblox UI commissions**.\n\n" +
          "• **Typical turnaround**: 3–7 days\n" +
          "• **Handoff**: Figma source + Studio `.rbxm` models + Luau scripts\n" +
          "• **Platforms**: Phone, Tablet, PC, Console scaled\n\n" +
          "Use `/brief` or DM to submit your game specs."
      )
      .setFooter({ text: "cerbis.xyz" })
      .setTimestamp();

    await interaction.reply({
      embeds: [statusEmbed],
      flags: MessageFlags.Ephemeral,
    });
  }
});

// -------------------------------------------------------------
// SCENARIO 2: Client DMs the Bot Directly
// -------------------------------------------------------------
client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  if (message.channel.type === ChannelType.DM) {
    const userId = message.author.id;
    const userName = message.author.displayName || message.author.username;
    const content = message.content.trim();

    console.log(`📩 Received DM from ${userName} (${userId}): ${content}`);

    // Send automated first response if new
    if (!greetedUsers.has(userId)) {
      greetedUsers.add(userId);
      const firstResponse = buildAutomatedFirstResponseEmbed(userName);
      await message.channel.send({ embeds: [new EmbedBuilder(firstResponse)] }).catch(console.error);
    }

    // Relay to admin channel
    await relayToAdmin(userId, userName, message.author.displayAvatarURL(), {
      text: content || "*Sent an attachment/media*",
    });
    return;
  }

  // -------------------------------------------------------------
  // SCENARIO 3: Cerbis Replies inside a Client Thread in Discord
  // -------------------------------------------------------------
  if (message.channel.isThread()) {
    const thread = message.channel as ThreadChannel;

    let targetUserId: string | null = null;
    for (const [userId, threadId] of activeThreads.entries()) {
      if (threadId === thread.id) {
        targetUserId = userId;
        break;
      }
    }

    if (targetUserId) {
      let replyContent = message.content.trim();
      if (client.user) {
        replyContent = replyContent.replace(new RegExp(`<@!?${client.user.id}>`, "g"), "").trim();
      }

      if (!replyContent) return;

      // Handle AI mode (!ai <prompt>)
      if (replyContent.startsWith("!ai ")) {
        const aiMessage = replyContent.replace("!ai ", "").trim();
        const aiEmbed = buildAiResponseEmbed(aiMessage);

        try {
          const clientUser = await client.users.fetch(targetUserId);
          await clientUser.send({ embeds: [new EmbedBuilder(aiEmbed)] });
          await message.react("🟣");
        } catch (err) {
          console.error("Failed to send AI response to client:", err);
          await message.reply("⚠️ Could not deliver message (user may have DMs closed).");
        }
        return;
      }

      // Standard Human Verified reply
      const humanEmbed = buildHumanResponseEmbed(
        replyContent,
        message.author.displayName || "Cerbis"
      );

      try {
        const clientUser = await client.users.fetch(targetUserId);
        await clientUser.send({ embeds: [new EmbedBuilder(humanEmbed)] });
        await message.react("🟢");
      } catch (err) {
        console.error("Failed to send human reply to client:", err);
        await message.reply("⚠️ Could not deliver message (user may have DMs closed).");
      }
    }
  }
});

client.login(BOT_TOKEN).catch((err) => {
  console.error("❌ Failed to login to Discord:", err);
  process.exit(1);
});
