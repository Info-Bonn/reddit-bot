// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const { subscribe } = require("./src/commands/subscribe");
const { unsubscribe } = require("./src/commands/unsubscribe");
const { list } = require("./src/commands/list");
const { sendUpdates } = require("./src/sendUpdates");

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  // starts the update Code once and then every x amount of ms
  sendUpdates(client);
  /* setInterval(() => {
    sendUpdates(client);
  }, 7200000); */
  setInterval(() => {
    sendUpdates(client);
  }, 300000);
});

// for "docker stop"
process.on("SIGTERM", () => {
  client.destroy();
});
// listener for slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.member.permissions.has("MANAGE_ROLES")) {
    interaction.reply(
      `You don't have manage roles permissions that are required to execute this command.`
    );
    return;
  }
  // switch that runs the correct code for used command
  switch (interaction.commandName) {
    case "subscribe": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });
      // gets the user generated input
      const subreddit = interaction.options.getString("subreddit");
      const category = interaction.options.getString("category");
      // the toplevel try/catch block that forwards every error to the user
      try {
        // calls the subscribe function and builds an embed from the return value
        // sends the embed and updates the defered reply
        interaction.channel.send({
          embeds: [
            await subscribe(
              subreddit,
              interaction.channelId,
              interaction.guildId,
              interaction.user.id,
              category
            ),
          ],
        });
        await interaction.editReply(
          `You successfully subscribed to the subreddit: ${subreddit}, this bot will check it in intervalls and send new Post as messages into this channel.`
        );
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error, here is the error message: ${error}`
        );
      }
      break;
    }
    case "unsubscribe": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });
      // gets the user generated input
      const subreddit = interaction.options.getString("subreddit");
      // the toplevel try/catch block that forwards every error to the user
      try {
        // calls the unsubscribe function
        await unsubscribe(
          subreddit,
          interaction.channelId,
          interaction.guildId
        );
        // update the defered reply if the unsubscribe function doesnt error
        await interaction.editReply(
          `You successfully unsubscribed from the subreddit: ${subreddit}.`
        );
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error, here is the error message: ${error}`
        );
      }
      break;
    }
    case "list": {
      // defers the reply so that the reply still works normally even if the backend is slower than 3 seconds
      await interaction.deferReply({ ephemeral: true });
      // the toplevel try/catch block that forwards every error to the user
      try {
        // calls the list function
        const commandList = await list(
          interaction.channelId,
          interaction.guildId
        );
        // update the defered reply with the return value of the list function if the unsubscribe function doesnt error
        interaction.editReply(
          `Here is the list of the current subscriptions from this channel: ${commandList}`
        );
      } catch (error) {
        // forwards errors to the user
        await interaction.editReply(
          `There was an error, here is the error message: ${error}`
        );
      }
      break;
    }
    // not really needed because discord only listens for deployed commands
    default:
      break;
  }
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
