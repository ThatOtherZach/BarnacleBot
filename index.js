const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

let prefix = "~";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Hello world command to see if she runs.
client.on("message", (msg) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
 
  if (msg.content.startsWith(prefix + "ping")) {
    msg.channel.send("pong!");
  }
});

// Pin a message to a channel with the pushpin reaction emoji
client.on("message", (msg) => {

  const filter = (reaction, user) => {
    return ['📌'].includes(reaction.emoji.name) && user.id === msg.author.id;
  };

  msg.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === '📌') {
        msg.pin({ reason: 'important' })
          .then(console.log)
          .catch(console.error);
        msg.channel.send('The message has been pinned!');
      }
    })
    .catch(collected => (console.error));
});

// Removes a pinned message from a channel with the x reaction emoji
client.on("message", (msg) => {

  const filter = (reaction, user) => {
    return ['❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
  };

  msg.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === '❌') {
        msg.unpin({ reason: 'no longer relevant' })
          .then(console.log)
          .catch(console.error)
        msg.channel.send('The message was unpinned!');
      } 
    })
    .catch(collected => (console.error));
});

client.login();

// Server to keep it awake and run for free because we cheap like that
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('The bot is online');
});
server.listen(3000);