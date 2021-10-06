const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { clientId, guildId, token } = require("../config.json");

const commands = [];
// get all commands
commands.push(require("./register_commands/subscribe"));
commands.push(require("./register_commands/unsubscribe"));
commands.push(require("./register_commands/list"));

const rest = new REST({ version: "9" }).setToken(token);
// register them with discord as guild commands
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
