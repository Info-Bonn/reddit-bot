// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { subscribe } = require("./src/commands/subscribe");
const { unsubscribe } = require("./src/commands/unsubscribe");
const { list } = require("./src/commands/list");
const { buildEmbed } = require("./src/buildEmbed");
const { sendUpdates } = require("./src/sendUpdates");

const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  setInterval(sendUpdates(client), 7200000);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "subscribe": {
      await interaction.deferReply({ ephemeral: true });
      const subreddit = interaction.options.getString("subreddit");
      try {
        const exampleEmbed = buildEmbed(
          await subscribe(
            subreddit,
            interaction.channelId,
            interaction.guildId,
            interaction.user.id
          )
        );
        interaction.channel.send({ embeds: [exampleEmbed] });
        await interaction.editReply(
          `You successfully subscribed to the subreddit: ${subreddit}, this bot will check it in intervalls and send new Post as messages into this channel.`
        );
      } catch (error) {
        await interaction.editReply(
          `There was an error while subscribing, here is the error message: ${error}`
        );
      }
      break;
    }
    case "unsubscribe": {
      await interaction.deferReply({ ephemeral: true });
      const subreddit = interaction.options.getString("subreddit");
      try {
        await unsubscribe(
          subreddit,
          interaction.channelId,
          interaction.guildId
        );
        await interaction.editReply(
          `You successfully unsubscribed from the subreddit: ${subreddit}.`
        );
      } catch (error) {
        await interaction.editReply(
          `There was an error while unsubscribing, here is the error message: ${error}`
        );
      }
      break;
    }
    case "list": {
      await interaction.deferReply({ ephemeral: true });

      try {
        const commandList = await list(
          interaction.channelId,
          interaction.guildId
        );
        interaction.editReply(
          `Here is the list of the current subscriptions from this channel: ${commandList}`
        );
      } catch (error) {
        await interaction.editReply(
          `There was an error while subscribing, here is the error message: ${error}`
        );
      }
      break;
    }
    default:
      break;
  }
});

// Login to Discord with your client's token
client.login(token);
