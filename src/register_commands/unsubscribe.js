const { SlashCommandBuilder } = require("@discordjs/builders");

// build the command with a name and description
const command = new SlashCommandBuilder()
  .setName("unsubscribe")
  .setDescription("Unsubscribe from a subreddit!");

// add the needed options
command.addStringOption((option) =>
  option
    .setName("subreddit")
    .setDescription(
      "The name of the subreddit that you want to unsubscribe from."
    )
    .setRequired(true)
);

module.exports = command.toJSON();
