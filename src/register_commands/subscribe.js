const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Subscribe to a subreddit!");

command.addStringOption((option) =>
  option
    .setName("subreddit")
    .setDescription("The name of the subreddit that you want to subscribe to.")
    .setRequired(true)
);

module.exports = command.toJSON();
