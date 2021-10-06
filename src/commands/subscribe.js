const { Command } = require("../db");
const { getPosts } = require("../getPosts");
const { buildEmbed } = require("../buildEmbed");

const subscribe = async (subreddit, channelId, guildId, userId, kind) => {
  // look for an existing subscription
  const prevCommand = await Command.findOne({
    subreddit,
    channelId,
    guildId,
  });
  // error if already subscribed
  if (prevCommand) {
    throw new Error(`This Channel already subscribed to ${subreddit}!`);
  }
  // get the newest post
  const newestPost = await getPosts(subreddit, null, kind);
  // create the subscription in the db
  const commandInstance = new Command({
    subreddit,
    userId,
    channelId,
    guildId,
    lastShownPost: newestPost.data.children[0].data.name,
    kind,
  });
  await commandInstance.save();
  // return the newest post as an embed
  return buildEmbed(newestPost.data.children[0].data);
};

module.exports.subscribe = subscribe;
