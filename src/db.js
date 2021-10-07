const mongoose = require("mongoose");

// connect to the db
mongoose.connect(process.env.DBCONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
