const { Command } = require("../db");

const list = async (channelId, guildId) => {
  const commands = await Command.find({
    channelId,
    guildId,
  });
  if (commands.length === 0) {
    throw new Error("There are no subscriptions to list in this channel!");
  }
  let commandList = "";
  commands.forEach((element) => {
    commandList += element.subreddit;
    commandList += ", ";
  });
  commandList = commandList.slice(0, -2);

  return commandList;
};

module.exports.list = list;
