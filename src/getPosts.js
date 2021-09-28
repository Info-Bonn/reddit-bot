const got = require("got");

const getPosts = async (subreddit, before) => {
  let myURL;
  if (before) {
    myURL = `https://www.reddit.com/r/${subreddit}/new.json?before=${before}&limit=100`;
  } else {
    myURL = `https://www.reddit.com/r/${subreddit}/new.json?limit=1`;
  }

  const response = await got(myURL);
  if (response.statusCode !== 200) {
    throw Error(response.statusMessage);
  }
  return JSON.parse(response.body);
};

module.exports.getPosts = getPosts;
