const mongoose = require("mongoose");

// connect to the db
mongoose.connect(
  "mongodb://localhost:27017/redditbot?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// setup the subscription schema
const commandSchema = new mongoose.Schema({
  subreddit: String,
  userId: String,
  channelId: String,
  guildId: String,
  lastShownPost: String,
  kind: String,
});
// register the schema
const Command = mongoose.model("Command", commandSchema);

module.exports.Command = Command;
