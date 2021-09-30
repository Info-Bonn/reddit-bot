const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/redditbot?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const commandSchema = new mongoose.Schema({
  subreddit: String,
  userId: String,
  channelId: String,
  guildId: String,
  lastShownPost: String,
});

const Command = mongoose.model("Command", commandSchema);

module.exports.Command = Command;
