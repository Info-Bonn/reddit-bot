const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List all subreddits that this channel is subscribed to!");

module.exports = command.toJSON();
