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
  const content = JSON.parse(response.body);
  if (
    content.data.children.length === 0 ||
    content.data.children[0].kind !== "t3"
  ) {
    throw new Error(
      "You either did not enter an existing subreddit, or the subreddit doesnt have any posts!"
    );
  }
  return content;
};

module.exports.getPosts = getPosts;
