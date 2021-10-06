const { SlashCommandBuilder } = require("@discordjs/builders");

// build the command with a name and description
const command = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Subscribe to a subreddit!");

// add the needed options
command.addStringOption((option) =>
  option
    .setName("subreddit")
    .setDescription("The name of the subreddit that you want to subscribe to.")
    .setRequired(true)
);
command.addStringOption((option) =>
  option
    .setName("category")
    .setDescription("The category of posts.")
    .setRequired(true)
    .addChoice("hot", "hot")
    .addChoice("new", "new")
);

module.exports = command.toJSON();
