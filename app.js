const discord = require("discord.js");
const client = new discord.Client();
let config = require("./config.json");
const fs = require("fs");
const mongoose = require("mongoose");
const Guild = require("./models/guild");
const { constants } = require("http2");

client.mongoose = require("./utils/mongoose");
require("./utils/eventHandler")(client);

let token = config.token;

client.mute = new Map();
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.catergories = fs.readdirSync(__dirname + "/commands/");

["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);

  var jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
  } else {
    console.log(jsfiles.length + " commands found");
  }

  jsfiles.forEach((f, i) => {
    var cmds = require(`./commands/${f}`);
    console.log * `Command ${f} loading...`;
    client.commands.set(cmds.config.command, cmds);
  });
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  const settings = await Guild.findOne(
    {
      guildID: message.guild.id,
    },
    (err, guild) => {
      if (err) console.error(err);
      if (!guild) {
        const newGuild = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          guildName: message.guild.name,
          prefix: config.prefix,
        });

        newGuild
          .save()
          .then((result) => console.log(result))
          .catch((err) => console.error(err));

        const embed1 = new discord.MessageEmbed()
          .setColor(config.MainColour)
          .setDescription(
            `<:NVInfo:717581337598492702> **${message.guild.name}** wasn't in our DataBase. I have added it to our DataBase.`
          );
        return message.channel.send(embed1);

        //<:xmark:741885103545778236>
      }
    }
  );

  const prefix = settings.prefix;
  const roleColor = message.guild.me.displayHexColor;

  let _1 = new discord.MessageEmbed()
    .setColor(roleColor)
    .setDescription(
      `The current prefix in ${message.guild.name} is \`${settings.prefix}\`. To chnage this prefix run \`${settings.prefix}prefix\`.`
    );

  if (
    message.content === `<@!${client.user.id}>` ||
    message.content === `<@${client.user.id}>`
  ) {
    return message.channel.send(_1);
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});

client.mongoose.init();
client.login(token);
