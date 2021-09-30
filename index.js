// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { subscribe } = require("./src/commands/subscribe");
const { buildEmbed } = require("./src/buildEmbed");

const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
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
    case "list": {
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
    default:
      break;
  }
});

// Login to Discord with your client's token
client.login(token);
