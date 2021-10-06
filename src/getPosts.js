const got = require("got");

const getPosts = async (subreddit, before, kind) => {
  // checks if before got included in the function call
  if (before) {
    // if its there then include it in the call to reddit to use for the pagination
    // copy it so we can change it later without worrying and to appease the almighty LINTER
    let dbPost = before;
    // build the url for the api call to get the newest post
    let myURL = `https://www.reddit.com/r/${subreddit}/comments/${dbPost.slice(
      3
    )}.json?raw_json=1`;
    // call the api
    let response = await got(myURL);
    //  check if reddit is reachable
    if (response.statusCode !== 200) {
      throw Error(response.statusMessage);
    }
    // parse the response
    let content = JSON.parse(response.body);
    // check if the post got deleted, if yes then increment the post id and try again
    // this is done because you cant paginate with deleted posts
    try {
      while (content[0].data.children[0].data.selftext === "[deleted]") {
        // increment the id
        dbPost = (parseInt(dbPost, 36) + 1).toString(36);
        // rebuild the url for the api call to get the newest post
        myURL = `https://www.reddit.com/r/${subreddit}/comments/${dbPost.slice(
          3
        )}.json?raw_json=1`;
        // call the api
        // in this case it is needed for the next iteration of the loop
        // eslint-disable-next-line no-await-in-loop
        response = await got(myURL);
        //  check if reddit is reachable
        if (response.statusCode !== 200) {
          throw Error(response.statusMessage);
        }
        // parse the response
        content = JSON.parse(response.body);
      }
    } catch (error) {
      console.log(error);
    }
    // build the url to get everything newer than the last shown post
    myURL = `https://www.reddit.com/r/${subreddit}/${kind}.json?before=${dbPost}&limit=100&raw_json=1`;
    // call the api
    response = await got(myURL);
    //  check if reddit is reachable
    if (response.statusCode !== 200) {
      throw Error(response.statusMessage);
    }
    // parse the response
    content = JSON.parse(response.body);
    // delete all pinned/stickied posts because they can mess with pagination
    for (let index = content.data.children.length - 1; index >= 0; index -= 1) {
      if (content.data.children[index].data.stickied) {
        content.data.children.splice(index, 1);
      }
    }
    // and check if there are new posts, if not then throw an error that gets recovered by the calling function
    if (content.data.children.length === 0) {
      throw new Error("No new content after dbPost!");
    }
    return content;
  }
  // if before is not included only get the latest post
  // build the url to get the latest posts (too have a buffer if some of them are pinned/stickied)
  const myURL = `https://www.reddit.com/r/${subreddit}/${kind}.json?limit=4&raw_json=1`;
  // call the api
  const response = await got(myURL);
  //  check if reddit is reachable
  if (response.statusCode !== 200) {
    throw Error(response.statusMessage);
  }
  // parse the response
  const content = JSON.parse(response.body);

  // delete all pinned/stickied posts because they can mess with pagination
  for (let index = content.data.children.length - 1; index >= 0; index -= 1) {
    if (content.data.children[index].data.stickied) {
      content.data.children.splice(index, 1);
    }
  }
  // check if the subreddit exists
  if (
    content.data.children[0].kind !== "t3" ||
    content.data.children.length === 0
  ) {
    throw new Error("You did not enter the name of an existing subreddit!");
  }

  return content;
};

module.exports.getPosts = getPosts;
