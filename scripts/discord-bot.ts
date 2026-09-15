import {
  Client,
  GatewayIntentBits,
  Partials,
  ChannelType,
  EmbedBuilder,
  ThreadChannel,
  TextChannel,
  Message,
} from "discord.js";
import {
  buildAutomatedFirstResponseEmbed,
  buildHumanResponseEmbed,
  buildAiResponseEmbed,
  DISCORD_COLORS,
} from "../src/lib/discord-embeds";

/**
 * Cerbis Discord Relay & Automated Response Bot
 *
 * Capabilities:
 * 1. Automatically responds to client DMs with an [AUTOMATED AI / SYSTEM] embed.
 * 2. Relays user briefs/messages to Cerbis's private Discord admin channel or thread.
 * 3. When Cerbis replies in the thread, delivers a [HUMAN RESPONSE • Cerbis (Verified)] embed to the user.
 * 4. Distinctly marks AI vs Human responses.
 */

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const ADMIN_CHANNEL_ID = process.env.DISCORD_ADMIN_CHANNEL_ID;

if (!BOT_TOKEN) {
  console.error("❌ DISCORD_BOT_TOKEN is missing in environment. Set it in .env.local.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

// Map user ID -> Thread ID in Cerbis's admin channel
const activeThreads = new Map<string, string>();
// Track if user received the automated first response in this session
const greetedUsers = new Set<string>();

client.once("ready", () => {
  console.log("==================================================");
  console.log(`🤖 Cerbis Discord Relay Bot is online as: ${client.user?.tag}`);
  if (GUILD_ID) {
    console.log(`🏠 Guild Target: ${GUILD_ID}`);
  }
  console.log(`📡 Ready to receive DMs and relay client enquiries.`);
  console.log("==================================================");
});

client.on("messageCreate", async (message: Message) => {
  // Ignore messages sent by bots
  if (message.author.bot) return;

  // -------------------------------------------------------------
  // SCENARIO 1: Client DMs the Bot
  // -------------------------------------------------------------
  if (message.channel.type === ChannelType.DM) {
    const userId = message.author.id;
    const userName = message.author.displayName || message.author.username;
    const content = message.content.trim();

    console.log(`📩 Received DM from ${userName} (${userId}): ${content}`);

    // A. Send Automated First Response if not already sent in this session
    if (!greetedUsers.has(userId)) {
      greetedUsers.add(userId);
      const firstResponse = buildAutomatedFirstResponseEmbed(userName);
      await message.channel.send({ embeds: [new EmbedBuilder(firstResponse)] }).catch(console.error);
    }

    // B. Relay message to Cerbis's Admin Discord Channel
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
              // Thread might have been deleted or archived
              thread = null;
            }
          }

          // Create new thread if needed
          if (!thread) {
            const cleanName = userName.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20) || "client";
            thread = await textChannel.threads.create({
              name: `💬・${cleanName}-${userId.slice(-4)}`,
              autoArchiveDuration: 1440, // 24 hours
              reason: `Client inquiry from ${userName} via Cerbis Discord App`,
            });
            activeThreads.set(userId, thread.id);

            // Introductory card for Cerbis
            const infoEmbed = new EmbedBuilder()
              .setTitle(`🎨 New Client Inquiry from ${userName}`)
              .setColor(DISCORD_COLORS.ACCENT)
              .setThumbnail(message.author.displayAvatarURL())
              .addFields(
                { name: "👤 Client", value: `${userName} (<@${userId}>)`, inline: true },
                { name: "🆔 Discord ID", value: `\`${userId}\``, inline: true },
                {
                  name: "Reply",
                  value: "Type in this thread. Whatever you send will be delivered to the client's DM with your verified badge.",
                  inline: false,
                }
              )
              .setTimestamp();

            await thread.send({ embeds: [infoEmbed] });
          }

          // Relay user's message into Cerbis's thread
          const userMsgEmbed = new EmbedBuilder()
            .setAuthor({
              name: `${userName} (Client)`,
              iconURL: message.author.displayAvatarURL(),
            })
            .setDescription(content || "*Sent an attachment/media*")
            .setColor(0x2f3136)
            .setTimestamp();

          await thread.send({ embeds: [userMsgEmbed] });
        }
      } catch (err) {
        console.error("Failed to relay DM to admin channel:", err);
      }
    }
    return;
  }

  // -------------------------------------------------------------
  // SCENARIO 2: Cerbis Replies inside a Client Thread
  // -------------------------------------------------------------
  if (message.channel.isThread()) {
    const thread = message.channel as ThreadChannel;
    
    // Find which client this thread belongs to
    let targetUserId: string | null = null;
    for (const [userId, threadId] of activeThreads.entries()) {
      if (threadId === thread.id) {
        targetUserId = userId;
        break;
      }
    }

    if (targetUserId) {
      const replyContent = message.content.trim();
      if (!replyContent) return;

      // Check if Cerbis wants to trigger an AI automated answer (!ai <prompt>)
      if (replyContent.startsWith("!ai ")) {
        const aiMessage = replyContent.replace("!ai ", "").trim();
        const aiEmbed = buildAiResponseEmbed(aiMessage);

        try {
          const clientUser = await client.users.fetch(targetUserId);
          await clientUser.send({ embeds: [new EmbedBuilder(aiEmbed)] });
          await message.react("🟣"); // React to confirm sent as AI
        } catch (err) {
          console.error("Failed to send AI response to client:", err);
          await message.reply("⚠️ Could not deliver message (user may have DMs closed).");
        }
        return;
      }

      // Standard reply -> Send as [HUMAN RESPONSE • Cerbis (Verified)]
      const humanEmbed = buildHumanResponseEmbed(replyContent, message.author.displayName || "Cerbis");

      try {
        const clientUser = await client.users.fetch(targetUserId);
        await clientUser.send({ embeds: [new EmbedBuilder(humanEmbed)] });
        await message.react("🟢"); // React to confirm delivered with Human badge
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
