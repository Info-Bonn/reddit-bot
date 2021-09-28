const mongoose = require("mongoose");

const { getPosts } = require("../getPosts");

async function dbConnect() {
  await mongoose.connect("");

  const commandSchema = new mongoose.Schema({
    subreddit: String,
    userId: String,
    channelId: String,
    guildId: String,
    lastShownPost: String,
  });
  const Command = mongoose.model("Command", commandSchema);
  return Command;
}
const subscribe = async (subreddit, channelId, guildId, userId) => {
  const newestPost = await getPosts(subreddit);

  /* const Command = dbConnect();
  const commandInstance = new Command({
    subreddit,
    userId,
    channelId,
    guildId,
    lastShownPost: newestPost.content.data.children[0].name,
  }); */
  return newestPost.data.children[0].data;
};

module.exports.subscribe = subscribe;
