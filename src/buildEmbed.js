const buildEmbed = (content) => {
  return {
    color: 0x0099ff,
    title: content.title,
    url: `https://reddit.com${content.permalink}`,
    author: {
      name: "reddit-bot",
      icon_url: "https://i.imgur.com/AfFp7pu.png",
      url: "https://knniff.de/reddit-bot",
    },
    image: {
      url: content.url,
    },
    timestamp: new Date(content.created_utc),
    footer: {
      text: content.author,
    },
  };
};

module.exports.buildEmbed = buildEmbed;