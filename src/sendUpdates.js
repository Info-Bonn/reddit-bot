const { Command } = require("./db");
const { getPosts } = require("./getPosts");
const { buildEmbed } = require("./buildEmbed");

async function sendPosts(subscription, client) {
  // set the channel to send the messages to
  const channel = client.channels.cache.get(subscription.channelId);
  let newPosts;
  try {
    newPosts = await getPosts(
      subscription.subreddit,
      subscription.lastShownPost
    );
  } catch (error) {
    console.log(error);
    return;
  }

  /* build embeds and send them to the respectiv channel

   one message can contain up to 10 embeds so if there
   are more then 10 post split the array into smaller arrays */
  /* if (newPosts.data.children.length < 11) {
    const postArray = [];
    newPosts.data.children.forEach((post) => {
      postArray.push(buildEmbed(post.data));
    });
    channel.send({ embeds: postArray });
  } else { */
  const embedArray = [];

  newPosts.data.children.forEach((post) => {
    embedArray.unshift(buildEmbed(post.data));
  });
  const size = 10;
  const arrayHolder = [];
  for (let i = 0; i < embedArray.length; i += size) {
    arrayHolder.push(embedArray.slice(i, i + size));
  }
  arrayHolder.forEach((embeds) => {
    channel.send({ embeds });
  });
  // }
  // Find the current subreddit in db and update it with the newest lastShownPost
  const updateCommand = await Command.findById(subscription.id);
  updateCommand.lastShownPost = newPosts.data.children[0].data.name;
  await updateCommand.save();
}

const sendUpdates = async (client) => {
  const commands = await Command.find();
  if (!commands) {
    return;
  }
  const results = [];
  for (let index = 0; index < commands.length; index += 1) {
    results.push(sendPosts(commands[index], client));
  }
  await Promise.all(results);
};

module.exports.sendUpdates = sendUpdates;
