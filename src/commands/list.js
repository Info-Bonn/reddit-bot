const { Command } = require("../db");

const list = async (channelId, guildId) => {
  // search the db for all subscriptions in the mentioned channel
  const commands = await Command.find({
    channelId,
    guildId,
  });
  // error if there are none
  if (commands.length === 0) {
    throw new Error("There are no subscriptions to list in this channel!");
  }
  // create the list with the subscription type
  let commandList = "";
  commands.forEach((element) => {
    commandList += element.subreddit;
    commandList += ` in ${element.kind}`;
    commandList += ", ";
  });
  // remove the last ", "
  commandList = commandList.slice(0, -2);

  return commandList;
};

module.exports.list = list;
