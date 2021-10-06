const { SlashCommandBuilder } = require("@discordjs/builders");
// build the command with a name and description
const command = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List all subreddits that this channel is subscribed to!");

module.exports = command.toJSON();
