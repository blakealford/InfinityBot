const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "membercount",
  category: "Info",
  description: "Get the current server count in that server.",
  run: async (client, message, args) => {
    const members = message.guild.members.cache;

    const membercount = new MessageEmbed()
      .setDescription(`**Members**\n${message.guild.memberCount}`)
      .setTimestamp()
      .setColor(config.MainColour);

    message.channel.send(membercount);
  },
};
