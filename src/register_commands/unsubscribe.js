const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder()
  .setName("unsubscribe")
  .setDescription("Unsubscribe from a subreddit!");

command.addStringOption((option) =>
  option
    .setName("subreddit")
    .setDescription(
      "The name of the subreddit that you want to unsubscribe from."
    )
    .setRequired(true)
);

module.exports = command.toJSON();
