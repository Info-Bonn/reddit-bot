const { Command } = require("../db");
const { getPosts } = require("../getPosts");

const subscribe = async (subreddit, channelId, guildId, userId) => {
  const newestPost = await getPosts(subreddit);

  const prevCommand = await Command.findOne({
    subreddit,
    channelId,
    guildId,
  });
  if (prevCommand) {
    throw new Error(`This Channel already subscribed to ${subreddit}!`);
  }
  const commandInstance = new Command({
    subreddit,
    userId,
    channelId,
    guildId,
    lastShownPost: newestPost.data.children[0].data.name,
  });
  await commandInstance.save();

  return newestPost.data.children[0].data;
};

module.exports.subscribe = subscribe;
