/**
 * Discord message layouts for the Cerbis relay bot and the website webhook.
 *
 * Plain Components V2 JSON with no discord.js dependency, so the Next.js route
 * and scripts/discord-bot.ts share one set of layouts. Every payload built here
 * has to be sent with the IsComponentsV2 flag, which rules out `content` and
 * `embeds` on the same message.
 *
 * Voice: first person, plain, the same as the site. Automated messages say so in
 * their subtext line; Cerbis's own replies are the only ones with a green bar.
 */

import {
  ButtonStyle,
  ComponentType,
  SeparatorSpacingSize,
  type APIActionRowComponent,
  type APIButtonComponent,
  type APIComponentInContainer,
  type APIComponentInMessageActionRow,
  type APIContainerComponent,
  type APIMessageTopLevelComponent,
  type APISectionComponent,
  type APISeparatorComponent,
  type APITextDisplayComponent,
} from "discord-api-types/v10";
import { site } from "../content/site.ts";

/** Message flag that switches a message to Components V2 (1 << 15). */
export const IS_COMPONENTS_V2 = 1 << 15;

export const COLORS = {
  brand: 0xff4a1c,
  human: 0x30d158,
  automated: 0xa855f7,
  reviewing: 0xf5a524,
  closed: 0x4e5058,
  danger: 0xed4245,
} as const;

export const IDS = {
  openBrief: "brief:open",
  briefModal: "brief:submit",
  statusPrefix: "conv:",
} as const;

export type ConversationStatus = "open" | "reviewing" | "closed";

export const STATUS_LABELS: Record<ConversationStatus, string> = {
  open: "Open",
  reviewing: "Reviewing",
  closed: "Closed",
};

const STATUS_COLORS: Record<ConversationStatus, number> = {
  open: COLORS.brand,
  reviewing: COLORS.reviewing,
  closed: COLORS.closed,
};

export function statusButtonId(status: ConversationStatus, userId: string) {
  return `${IDS.statusPrefix}${status}:${userId}`;
}

export function parseStatusButtonId(customId: string) {
  if (!customId.startsWith(IDS.statusPrefix)) return null;
  const [status, userId] = customId.slice(IDS.statusPrefix.length).split(":");
  if (!userId || !(status in STATUS_LABELS)) return null;
  return { status: status as ConversationStatus, userId };
}

/* ---------------------------------------------------------------------------
   Data shapes
   --------------------------------------------------------------------------- */

/** A file on the message, referenced as `attachment://name`. */
export interface MediaRef {
  url: string;
  image: boolean;
}

/** A file that could not be re-uploaded, shown as a link instead. */
export interface LinkRef {
  name: string;
  url: string;
}

export interface ClientRef {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface RobloxGame {
  name: string;
  url: string;
  creator: string;
  playing: number;
  visits: number;
  favorites: number;
  updatedAt?: string;
  iconUrl?: string;
}

export interface Brief {
  no: number;
  game: string;
  screens: string[];
  budget: string;
  details?: string;
  references: number;
  submittedAt: number;
  roblox?: RobloxGame | null;
  media?: MediaRef[];
  oversized?: LinkRef[];
}

/* ---------------------------------------------------------------------------
   Text helpers
   --------------------------------------------------------------------------- */

export function escapeMarkdown(value: string): string {
  return value.replace(/[\\*_~`|[\]()<>]/g, "\\$&").replace(/^(\s*)([#>-])/gm, "$1\\$2");
}

export function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

/** Splits long text on line or word boundaries so each piece fits `max`. */
export function splitText(value: string, max: number): string[] {
  const chunks: string[] = [];
  let rest = value;
  while (rest.length > max) {
    let cut = rest.lastIndexOf("\n", max);
    if (cut < max / 2) cut = rest.lastIndexOf(" ", max);
    if (cut < max / 2) cut = max;
    chunks.push(rest.slice(0, cut).trimEnd());
    rest = rest.slice(cut).trimStart();
  }
  chunks.push(rest);
  return chunks;
}

export function formatBriefNo(no: number) {
  return `#${String(no).padStart(4, "0")}`;
}

const numberFormat = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const URL_RE = /^https?:\/\/\S+$/i;
const WORK_URL = `${site.url}/work`;
const DM_URL = site.links.find((l) => l.label === "Discord")?.href ?? site.url;

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;
const relativeTime = (ms: number) => `<t:${Math.floor(ms / 1000)}:R>`;
const field = (label: string, value: string) => `**${label}**\u2002${value}`;
const lines = (...rows: Array<string | false | null | undefined>) => rows.filter(Boolean).join("\n");
const linkOrText = (value: string) => (URL_RE.test(value) ? value : escapeMarkdown(value));

function gameTitle(brief: Pick<Brief, "game" | "roblox">) {
  if (brief.roblox) return brief.roblox.name;
  if (!URL_RE.test(brief.game)) return brief.game;
  try {
    return new URL(brief.game).hostname.replace(/^www\./, "");
  } catch {
    return "Linked game";
  }
}

function gameLink(brief: Pick<Brief, "game" | "roblox">) {
  return brief.roblox
    ? `[${escapeMarkdown(brief.roblox.name)}](${brief.roblox.url})`
    : linkOrText(brief.game);
}

/* ---------------------------------------------------------------------------
   Component primitives
   --------------------------------------------------------------------------- */

type TopLevel = APIMessageTopLevelComponent;
type ContainerChild = APIComponentInContainer;
type ActionStyle = ButtonStyle.Primary | ButtonStyle.Secondary | ButtonStyle.Success | ButtonStyle.Danger;

const text = (content: string): APITextDisplayComponent => ({
  type: ComponentType.TextDisplay,
  content,
});

const divider = (spacing = SeparatorSpacingSize.Small): APISeparatorComponent => ({
  type: ComponentType.Separator,
  divider: true,
  spacing,
});

/** Text with a thumbnail on the right; plain text when there is no image. */
function header(content: string, thumbnailUrl?: string | null): APISectionComponent | APITextDisplayComponent {
  if (!thumbnailUrl) return text(content);
  return {
    type: ComponentType.Section,
    components: [text(content)],
    accessory: { type: ComponentType.Thumbnail, media: { url: thumbnailUrl } },
  };
}

function container(accent: number, children: Array<ContainerChild | false | "" | null | undefined>): APIContainerComponent {
  return {
    type: ComponentType.Container,
    accent_color: accent,
    components: children.filter((child): child is ContainerChild => Boolean(child)),
  };
}

const row = (...buttons: APIButtonComponent[]): APIActionRowComponent<APIComponentInMessageActionRow> => ({
  type: ComponentType.ActionRow,
  components: buttons,
});

const button = (
  customId: string,
  label: string,
  style: ActionStyle = ButtonStyle.Secondary,
  disabled = false,
): APIButtonComponent => ({ type: ComponentType.Button, custom_id: customId, label, style, disabled });

const link = (url: string, label: string): APIButtonComponent => ({
  type: ComponentType.Button,
  style: ButtonStyle.Link,
  url,
  label,
});

function mediaComponents(media: readonly MediaRef[] = [], oversized: readonly LinkRef[] = []): ContainerChild[] {
  const children: ContainerChild[] = [];
  const images = media.filter((m) => m.image).slice(0, 10);
  if (images.length) {
    children.push({ type: ComponentType.MediaGallery, items: images.map((m) => ({ media: { url: m.url } })) });
  }
  for (const file of media.filter((m) => !m.image)) {
    children.push({ type: ComponentType.File, file: { url: file.url } });
  }
  if (oversized.length) {
    const links = oversized.map((f) => `[${escapeMarkdown(f.name)}](${f.url})`).join(", ");
    children.push(text(`-# Too large to attach: ${links}`));
  }
  return children;
}

/* ---------------------------------------------------------------------------
   Client-facing messages
   --------------------------------------------------------------------------- */

function briefFacts(brief: Brief) {
  return lines(
    field("Game", gameLink(brief)),
    field("Screens", brief.screens.join(" · ")),
    field("Budget", brief.budget),
    brief.references > 0 && field("References", plural(brief.references, "file")),
  );
}

/** Persistent receipt, sent to the client's DM after a brief is filed. */
export function buildBriefReceipt(brief: Brief, clientName: string): TopLevel[] {
  return [
    container(COLORS.brand, [
      header(
        lines(
          `-# Brief ${formatBriefNo(brief.no)} · automated receipt`,
          "## Brief received",
          `Thanks, ${escapeMarkdown(clientName)}. I read every brief myself and reply right here in this DM, usually the same day.`,
        ),
        brief.roblox?.iconUrl,
      ),
      divider(),
      text(briefFacts(brief)),
      divider(),
      text(
        lines(
          "**What happens next**",
          "`1`\u2002I open the game and go through your references.",
          "`2`\u2002You get a quote and a timeline in this DM.",
          "`3`\u2002My own replies have a green bar. Anything else, like this, is automated.",
        ),
      ),
      divider(),
      text("-# Forgot something? Reply to this DM and it comes straight to me."),
      row(button(IDS.openBrief, "Send another brief"), link(WORK_URL, "See my work")),
    ]),
  ];
}

/** Ephemeral confirmation where /brief was run, when that place isn't the bot DM. */
export function buildBriefSentNotice(brief: Brief, receiptUrl: string | null): TopLevel[] {
  const label = `-# Brief ${formatBriefNo(brief.no)}`;
  if (receiptUrl) {
    return [
      container(COLORS.brand, [
        text(lines(label, "### Sent to Cerbis", "Your receipt is in your DMs with the Cerbis app, and that's where my reply will land.")),
        row(link(receiptUrl, "Open receipt")),
      ]),
    ];
  }
  return [
    container(COLORS.reviewing, [
      text(
        lines(
          label,
          "### Sent, but I can't DM you",
          "Your brief reached me, but Discord won't let the app message you, so my reply can't get through. Allow DMs from the Cerbis app, or message me directly.",
        ),
      ),
      row(link(DM_URL, "Message @Cerbi")),
    ]),
  ];
}

/** Shown when a brief could not be filed; echoes the input so nothing is retyped from memory. */
export function buildBriefFailedNotice(input: Pick<Brief, "game" | "screens" | "budget" | "details">): TopLevel[] {
  return [
    container(COLORS.danger, [
      text(
        lines(
          "### Your brief didn't go through",
          "The relay couldn't reach me just now. Try again in a minute, and if it keeps failing, message me directly.",
        ),
      ),
      divider(),
      text(
        lines(
          "-# What you wrote, so you can paste it back in",
          field("Game", escapeMarkdown(input.game)),
          field("Screens", input.screens.join(" · ")),
          field("Budget", input.budget),
        ),
      ),
      input.details && text(`>>> ${truncate(input.details, 2000)}`),
      row(link(DM_URL, "Message @Cerbi")),
    ]),
  ];
}

/** First automated reply when someone DMs without a brief (once per quiet period). */
export function buildDmWelcome(): TopLevel[] {
  return [
    container(COLORS.brand, [
      text(
        lines(
          "-# Automated reply",
          "### Delivered to Cerbis",
          "Your message is in my inbox. I answer here myself, usually the same day, and my replies have a green bar.",
        ),
      ),
      divider(),
      text(
        "**After a quote?** A brief gets you one faster. It takes a minute: game link, the screens you need, a rough budget and any references.",
      ),
      row(button(IDS.openBrief, "Write a brief", ButtonStyle.Primary), link(WORK_URL, "See my work")),
    ]),
  ];
}

export function buildHumanReply(options: {
  body: string;
  authorName: string;
  media?: MediaRef[];
  continued?: boolean;
}): TopLevel[] {
  return [
    container(COLORS.human, [
      !options.continued && text(`-# ${escapeMarkdown(options.authorName)}`),
      options.body && text(options.body),
      ...mediaComponents(options.media),
    ]),
  ];
}

export function buildAutomatedAnswer(options: { body: string; media?: MediaRef[]; continued?: boolean }): TopLevel[] {
  return [
    container(COLORS.automated, [
      !options.continued && text("-# Automated answer · Cerbis confirms quotes and dates personally"),
      options.body && text(options.body),
      ...mediaComponents(options.media),
    ]),
  ];
}

export function buildStatusNotice(status: Exclude<ConversationStatus, "open">, briefNo?: number): TopLevel[] {
  if (status === "reviewing") {
    const subject = briefNo ? `brief ${formatBriefNo(briefNo)}` : "your message";
    return [
      container(COLORS.reviewing, [
        text(lines("-# Status update", "### I'm on it", `I'm going through ${subject} now. The quote comes to this DM.`)),
      ]),
    ];
  }
  return [
    container(COLORS.closed, [
      text(
        lines(
          "-# Status update",
          "### Conversation closed",
          "Thanks for reaching out. If anything changes, reply here or send a new brief and it reopens.",
        ),
      ),
      row(button(IDS.openBrief, "Write a brief"), link(WORK_URL, "See my work")),
    ]),
  ];
}

export function buildStudioStatus({ activeBriefs, avatarUrl }: { activeBriefs: number; avatarUrl?: string }): TopLevel[] {
  const { open, label, closedLabel } = site.availability;
  const queue =
    activeBriefs === 0 ? "Nothing in the queue right now" : `${plural(activeBriefs, "brief")} in the queue right now`;

  return [
    container(open ? COLORS.human : COLORS.closed, [
      header(
        lines(
          `-# ${site.name} · ${site.role}`,
          `## ${open ? label : closedLabel}`,
          "Menus, shops and HUDs for Roblox games. Designed in Figma, built in Studio.",
        ),
        avatarUrl,
      ),
      divider(),
      text(
        lines(
          field("Turnaround", "3 to 7 days for a typical set of screens"),
          field("Handoff", "Figma source, Studio `.rbxm` and commented Luau"),
          field("Scaling", "Phone, tablet, desktop and console"),
        ),
      ),
      divider(),
      text(`-# ${queue}`),
      row(
        button(IDS.openBrief, open ? "Write a brief" : "Send a brief anyway", open ? ButtonStyle.Primary : ButtonStyle.Secondary),
        link(WORK_URL, "See my work"),
      ),
    ]),
  ];
}

export function buildNotice(title: string, body: string, tone: "info" | "error" = "info"): TopLevel[] {
  return [container(tone === "error" ? COLORS.danger : COLORS.closed, [text(lines(`### ${title}`, body))])];
}

/* ---------------------------------------------------------------------------
   Admin thread messages
   --------------------------------------------------------------------------- */

const ADMIN_HINT =
  "-# Reply in this thread to answer in their DMs · start with `//` to keep a note private · `!ai` sends it as an automated answer";

function statusRow(userId: string, status: ConversationStatus) {
  const profile = link(`https://discord.com/users/${userId}`, "Profile");
  if (status === "closed") return row(button(statusButtonId("open", userId), "Reopen"), profile);
  const reviewing = status === "reviewing";
  return row(
    button(statusButtonId("reviewing", userId), reviewing ? "Reviewing" : "Start review", ButtonStyle.Primary, reviewing),
    button(statusButtonId("closed", userId), "Close"),
    profile,
  );
}

export function buildAdminBriefCard({
  client,
  brief,
  status,
  interactive,
}: {
  client: ClientRef;
  brief: Brief;
  status: ConversationStatus;
  /** False for webhook posts, which can't carry buttons or receive replies. */
  interactive: boolean;
}): TopLevel[] {
  const game = brief.roblox;
  const updated = game?.updatedAt ? Date.parse(game.updatedAt) : NaN;
  const gameStats = game
    ? lines(
        `**[${escapeMarkdown(game.name)}](${game.url})** by ${escapeMarkdown(game.creator)}`,
        `-# ${numberFormat.format(game.playing)} playing · ${numberFormat.format(game.visits)} visits · ${numberFormat.format(game.favorites)} favorites${Number.isNaN(updated) ? "" : ` · updated ${relativeTime(updated)}`}`,
      )
    : "";

  return [
    container(STATUS_COLORS[status], [
      header(
        lines(
          `-# Brief ${formatBriefNo(brief.no)} · ${STATUS_LABELS[status]}`,
          `## ${escapeMarkdown(truncate(gameTitle(brief), 80))}`,
          `from **${escapeMarkdown(client.name)}** · <@${client.id}> · \`${client.id}\``,
        ),
        client.avatarUrl,
      ),
      divider(),
      game ? header(gameStats, game.iconUrl) : text(field("Game", gameLink(brief))),
      text(lines(field("Screens", brief.screens.join(" · ")), field("Budget", brief.budget))),
      brief.details && text(`**Details**\n>>> ${truncate(brief.details, 2000)}`),
      ...mediaComponents(brief.media, brief.oversized),
      divider(),
      text(
        lines(
          `-# Submitted ${relativeTime(brief.submittedAt)}${interactive ? "" : " · posted by webhook, so replies here won't reach them"}`,
          interactive && ADMIN_HINT,
        ),
      ),
      interactive && statusRow(client.id, status),
    ]),
  ];
}

/** Opens a thread that started from a DM rather than a brief. */
export function buildAdminIntroCard({ client, status }: { client: ClientRef; status: ConversationStatus }): TopLevel[] {
  return [
    container(STATUS_COLORS[status], [
      header(
        lines(
          `-# Conversation · ${STATUS_LABELS[status]}`,
          `## ${escapeMarkdown(truncate(client.name, 80))}`,
          `<@${client.id}> · \`${client.id}\` · started from a DM`,
        ),
        client.avatarUrl,
      ),
      divider(),
      text(ADMIN_HINT),
      statusRow(client.id, status),
    ]),
  ];
}

export function buildAdminNote(note: string): TopLevel[] {
  return [text(`-# ${note}`)];
}

/* ---------------------------------------------------------------------------
   Website contact form → webhook
   --------------------------------------------------------------------------- */

export function buildWebsiteBriefCard(data: {
  name: string;
  scope: string;
  game?: string;
  message: string;
  discordId?: string;
  discordUser?: string;
}): TopLevel[] {
  const discordId = data.discordId && /^\d{17,20}$/.test(data.discordId) ? data.discordId : undefined;
  const handle = data.discordUser ? ` (@${escapeMarkdown(data.discordUser)})` : "";

  return [
    container(COLORS.brand, [
      text(
        lines(
          `-# Website enquiry · ${escapeMarkdown(data.scope)}`,
          `## ${escapeMarkdown(truncate(data.game || "No project link", 80))}`,
          `from **${escapeMarkdown(data.name)}**${handle}`,
          discordId && `<@${discordId}> · [Open Discord profile](https://discord.com/users/${discordId})`,
        ),
      ),
      divider(),
      text(lines(field("Scope", escapeMarkdown(data.scope)), field("Project", data.game ? linkOrText(data.game) : "Not given"))),
      text(`**Details**\n>>> ${truncate(data.message, 3000)}`),
      divider(),
      text(`-# Sent from the contact form on ${new URL(site.url).host} · ${discordId ? "reply on Discord or by email" : "reply by email"}`),
    ]),
  ];
}
