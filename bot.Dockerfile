# Discord relay bot (scripts/discord-bot.ts) for an always-on host such as Railway.
# The website deploys to Vercel separately and ignores this file.

FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Only what the bot imports: the script, its helpers, and the shared layouts.
COPY scripts ./scripts
COPY src/lib/discord-messages.ts ./src/lib/discord-messages.ts
COPY src/content/site.ts ./src/content/site.ts

# Relay state lives in /app/.data; mount a persistent volume there.
RUN mkdir -p /app/.data

# Exec form so node is PID 1 and gets SIGTERM, which flushes the store.
CMD ["node", "--experimental-strip-types", "scripts/discord-bot.ts"]
