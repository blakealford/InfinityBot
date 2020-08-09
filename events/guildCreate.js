const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const mongoose = require("mongoose");
const Guild = require("../models/guild");

module.exports = async (client, guild) => {
  guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildID: message.guild.id,
    guildName: message.guild.name,
    prefix: config.prefix,
  });

  guild.save();

  const channel = message.guild.channels.cache.random().id;

  const embed1 = new MessageEmbed()
  .setAuthor("Infinity")
  .setDescription(
    `Thanks for adding me to **${message.guild.name}!**\nMy name is **Infinity** and I have lots of features like:\n\n- **Moderation** Commands\n- **Fun** Commands\n- **Utlity** Commands\n- **Info** Commands \n\nBy default my prefix is \`?\`. If you wish to change my prefix you can run \`?prefix\`.\n\n**Links**\n\n- **Support Server:** [\`discord.gg/WbPzFjC\`](https://discord.gg/WbPzFjC)\n- **Docucumentation:** \`Coming Soon\`\n- **Vote Fur Us:** \`Pending Verification\\n\n For more information you can run \`?help\` and get all of the commands we have to offer.`
    )
  .setColor(config.MainColour);
  channel.send(embed1)
};

// //const gu1lds = client.guilds.cache.map(guild => ${guild.owner.user.tag}).join("\n\n")

// const embed = new Discord.MessageEmbed()
// .setTitle('Owners')
// .setDescription(**${gu1lds}**)
// .setColor("GREEN")
// message.channel.send(embed)
