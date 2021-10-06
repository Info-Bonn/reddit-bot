// checks if a string is a url
const stringIsAValidUrl = (s) => {
  try {
    const url = new URL(s);
    if (s.startsWith("http") || s.startsWith("https")) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// builds an embed object
const buildEmbed = (content) => {
  // if the url field is a valid url then put it in the image field
  if (stringIsAValidUrl(content.url)) {
    return {
      color: 0x0099ff,
      title: content.title,
      url: `https://reddit.com${content.permalink}`,
      author: {
        name: "reddit-bot",
        icon_url: "https://i.imgur.com/AfFp7pu.png",
        url: "https://knniff.de/reddit-bot",
      },
      description: content.subreddit_name_prefixed,
      image: {
        url: content.url,
      },
      timestamp: new Date(content.created_utc * 1000),
      footer: {
        text: content.author,
      },
    };
  }
  return {
    color: 0x0099ff,
    title: content.title,
    url: `https://reddit.com${content.permalink}`,
    author: {
      name: "reddit-bot",
      icon_url: "https://i.imgur.com/AfFp7pu.png",
      url: "https://knniff.de/reddit-bot",
    },
    description: content.subreddit_name_prefixed,
    timestamp: new Date(content.created_utc * 1000),
    footer: {
      text: content.author,
    },
  };
};

module.exports.buildEmbed = buildEmbed;
