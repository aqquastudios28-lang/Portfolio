import type { RobloxGame } from "../../src/lib/discord-messages.ts";

/**
 * Best-effort lookup of a Roblox experience from a link or place ID, so the
 * brief card shows the real game name, icon and player numbers. Public,
 * unauthenticated endpoints; any failure just means the card shows the raw link.
 */

const PLACE_LINK_RE = /roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?games\/(\d+)/i;
const HIT_TTL_MS = 10 * 60 * 1000;
const MISS_TTL_MS = 60 * 1000;

const cache = new Map<string, { at: number; game: RobloxGame | null }>();

export function extractPlaceId(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(PLACE_LINK_RE);
  if (match) return match[1];
  return /^\d{5,20}$/.test(trimmed) ? trimmed : null;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
  return (await res.json()) as T;
}

interface GamesResponse {
  data: Array<{
    name: string;
    rootPlaceId: number;
    playing: number | null;
    visits: number | null;
    favoritedCount: number | null;
    updated: string;
    creator: { name: string } | null;
  }>;
}

interface IconsResponse {
  data: Array<{ imageUrl: string | null; state: string }>;
}

export async function lookupRobloxGame(input: string): Promise<RobloxGame | null> {
  const placeId = extractPlaceId(input);
  if (!placeId) return null;

  const cached = cache.get(placeId);
  if (cached && Date.now() - cached.at < (cached.game ? HIT_TTL_MS : MISS_TTL_MS)) return cached.game;

  let game: RobloxGame | null = null;
  try {
    const { universeId } = await getJson<{ universeId: number | null }>(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
    );
    if (universeId) {
      const [games, icons] = await Promise.all([
        getJson<GamesResponse>(`https://games.roblox.com/v1/games?universeIds=${universeId}`),
        getJson<IconsResponse>(
          `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`,
        ).catch(() => null),
      ]);
      const info = games.data[0];
      const icon = icons?.data[0];
      if (info) {
        game = {
          name: info.name,
          url: `https://www.roblox.com/games/${info.rootPlaceId || placeId}`,
          creator: info.creator?.name ?? "unknown creator",
          playing: info.playing ?? 0,
          visits: info.visits ?? 0,
          favorites: info.favoritedCount ?? 0,
          updatedAt: info.updated,
          iconUrl: icon?.state === "Completed" && icon.imageUrl ? icon.imageUrl : undefined,
        };
      }
    }
  } catch (err) {
    console.warn(`⚠️ Roblox lookup failed for place ${placeId}:`, (err as Error).message);
  }

  cache.set(placeId, { at: Date.now(), game });
  return game;
}
