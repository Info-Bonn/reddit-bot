const { Command } = require("../db");

const unsubscribe = async (subreddit, channelId, guildId) => {
  const response = await Command.deleteOne({
    subreddit,
    channelId,
    guildId,
  });
  if (response.deletedCount === 0) {
    throw new Error(
      `You have not unsubscribed from ${subreddit}, maybe you never subscribed to it or you misspelled it.`
    );
  }
};

module.exports.unsubscribe = unsubscribe;
