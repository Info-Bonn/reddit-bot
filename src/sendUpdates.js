const { Command } = require("./db");
const { getPosts } = require("./getPosts");
const { buildEmbed } = require("./buildEmbed");

async function sendPosts(subscription, client) {
  // set the channel to send the messages to
  const channel = client.channels.cache.get(subscription.channelId);
  // gets newest Posts for the current subreddit with the recorded lastShownPost
  let newPosts;
  try {
    newPosts = await getPosts(
      subscription.subreddit,
      subscription.lastShownPost,
      subscription.kind
    );
  } catch (error) {
    // getPosts errors if no new Posts have been posted in current subreddit
    // console.log(error);
    // brakes out of the function early because there were no new posts
    return;
  }
  if (newPosts.data.children.length === 0) {
    console.log("Weird 0 length Error");
    return;
  }

  const embedArray = [];

  // reverses the posts list while building the embeds
  newPosts.data.children.forEach((post) => {
    embedArray.unshift(buildEmbed(post.data));
  });
  // a message can have max 10 embeds so this function generates arrays with a max of 10 embeds in it
  const size = 10;
  const arrayHolder = [];
  for (let i = 0; i < embedArray.length; i += size) {
    arrayHolder.push(embedArray.slice(i, i + size));
  }
  // sends all embeds in the specified channel
  try {
    arrayHolder.forEach((embeds) => {
      channel.send({ embeds });
    });
  } catch (error) {
    console.log(error);
  }

  // }
  // Find the current subreddit in db and update it with the newest lastShownPost
  const updateCommand = await Command.findById(subscription.id);
  updateCommand.lastShownPost = newPosts.data.children[0].data.name;
  await updateCommand.save();
}
async function sendAllPosts(client) {
  // gets all subscriptions from the db
  const commands = await Command.find();
  // returns if the db is empty
  if (!commands) {
    return;
  }
  // queues up the commands
  const results = [];
  for (let index = 0; index < commands.length; index += 1) {
    results.push(sendPosts(commands[index], client));
  }
  // awaits all promises so that they can be handled simultaneously
  await Promise.all(results);
}

// a helper function that is not asynchrounous so that it can be called with setIntervall
const sendUpdates = (client) => {
  sendAllPosts(client);
};

module.exports.sendUpdates = sendUpdates;
