const { Command } = require("../db");

const unsubscribe = async (subreddit, channelId, guildId) => {
  // deleted the subscription
  const response = await Command.deleteOne({
    subreddit,
    channelId,
    guildId,
  });
  // if the deletedCount is 0 then it didnt exist so it errors
  if (response.deletedCount === 0) {
    throw new Error(
      `You have not unsubscribed from ${subreddit}, maybe you never subscribed to it or you misspelled it.`
    );
  }
};

module.exports.unsubscribe = unsubscribe;
