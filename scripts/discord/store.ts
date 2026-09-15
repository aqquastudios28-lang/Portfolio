import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Brief, ConversationStatus } from "../../src/lib/discord-messages.ts";

/**
 * Relay state on disk: which thread belongs to which client, brief numbers and
 * status. Kept in .data/ (gitignored) so replies still reach clients after the
 * bot restarts, which an in-memory map could not do.
 */

export interface StoredBrief extends Brief {
  /** The brief card in the admin thread, so status buttons can redraw it. */
  messageId?: string;
}

export interface Conversation {
  userId: string;
  userName: string;
  avatarUrl: string;
  status: ConversationStatus;
  threadId?: string;
  introMessageId?: string;
  createdAt: number;
  updatedAt: number;
  lastClientMessageAt?: number;
  lastBriefAt?: number;
  lastGame?: string;
  briefs: StoredBrief[];
}

interface StoreFile {
  version: 1;
  briefSeq: number;
  conversations: Record<string, Conversation>;
}

const FILE = path.resolve(process.cwd(), ".data", "discord-relay.json");
const MAX_BRIEFS_KEPT = 20;

const data = load();
let saveTimer: ReturnType<typeof setTimeout> | undefined;

function empty(): StoreFile {
  return { version: 1, briefSeq: 0, conversations: {} };
}

function load(): StoreFile {
  let raw: string;
  try {
    raw = readFileSync(FILE, "utf8");
  } catch {
    return empty();
  }

  try {
    const parsed = JSON.parse(raw) as StoreFile;
    if (parsed.version === 1 && parsed.conversations) return parsed;
  } catch {
    // fall through to the backup below
  }

  // Never overwrite a file we couldn't read; set it aside for inspection.
  const backup = `${FILE}.corrupt-${Date.now()}`;
  renameSync(FILE, backup);
  console.warn(`⚠️ Relay store was unreadable, moved it to ${backup} and started fresh.`);
  return empty();
}

export function flushStore() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = undefined;
  mkdirSync(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2));
  renameSync(tmp, FILE);
}

function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    try {
      flushStore();
    } catch (err) {
      console.error("Failed to save the relay store:", err);
    }
  }, 500);
}

export function getConversation(userId: string): Conversation | undefined {
  return data.conversations[userId];
}

export function findConversationByThread(threadId: string): Conversation | undefined {
  return Object.values(data.conversations).find((c) => c.threadId === threadId);
}

export function upsertConversation(user: { id: string; name: string; avatarUrl: string }): Conversation {
  const existing = data.conversations[user.id];
  if (existing) {
    existing.userName = user.name;
    existing.avatarUrl = user.avatarUrl;
    return existing;
  }

  const now = Date.now();
  const created: Conversation = {
    userId: user.id,
    userName: user.name,
    avatarUrl: user.avatarUrl,
    status: "open",
    createdAt: now,
    updatedAt: now,
    briefs: [],
  };
  data.conversations[user.id] = created;
  scheduleSave();
  return created;
}

export function saveConversation(conversation: Conversation) {
  conversation.updatedAt = Date.now();
  data.conversations[conversation.userId] = conversation;
  scheduleSave();
}

export function nextBriefNo() {
  data.briefSeq += 1;
  scheduleSave();
  return data.briefSeq;
}

export function addBrief(conversation: Conversation, brief: StoredBrief) {
  conversation.briefs = [...conversation.briefs, brief].slice(-MAX_BRIEFS_KEPT);
  conversation.lastBriefAt = brief.submittedAt;
  conversation.lastGame = brief.game;
  saveConversation(conversation);
}

/** Clients with at least one brief whose conversation isn't closed. */
export function activeBriefCount() {
  return Object.values(data.conversations).filter((c) => c.status !== "closed" && c.briefs.length > 0).length;
}
