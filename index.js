const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();

// -------------------- EXPRESS SERVER --------------------
app.get("/", (req, res) => {
  res.send("Bot is alive");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// -------------------- DISCORD BOT --------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Example welcome message (when a member joins)
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.systemChannel;
  if (!channel) return;

  channel.send(`📚 Welcome to Sip & Read, ${member}! ☕📖`);
});

// Example message response
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "ping") {
    message.reply("pong!");
  }
});

// -------------------- LOGIN --------------------
client.login(process.env.DISCORD_TOKEN);
