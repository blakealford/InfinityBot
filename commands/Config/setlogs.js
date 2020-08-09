const config = require("../../config.json");
const { MessageEmbed }= require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const logsChannel = require("../../models/logchannel");

module.exports = {
  name: "setlogs",
  category: "Config",
  description: "Sets the log channel for your server",
  run: async (client, message, args) => {
    const settings = await Guild.findOne({
        guildID: message.guild.id 
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id, 
                guildName: message.guild.name,
                prefix: config.prefix
            })
    
            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err))
        }
})
    let channel =
      message.mentions.channels.first() || client.channels.cache.get(args[0]);
    const embed1 = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236> You don't have the correct permissions to use this command."
      )
      .setColor(config.RedColour);

    const embed2 = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236> I don't have the correct permissions to use this command."
      )
      .setColor(config.RedColour);

    const embed3 = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236> You need to sepcify a channel."
      )
      .setColor(config.RedColour);

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(embed1);
    }
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
      message.channel.send(embed2);
    }

    if (!channel) {
      return message.channel.send(embed3);
    }

    logsChannel.findOne({ serverID: message.guild.id }, async (err, data) => {
      if (!data) {
        let newLogs = new logsChannel({
          serverName: message.guild.name,
          serverID: message.guild.id,
          logChannelID: channel.id,
        });
        const embed = new MessageEmbed()
          .setDescription(
            `<:check:741884530344067124> Log Channel set to ${channel}`
          )
          .setColor(config.GreenColour);

        message.channel.send(embed);
        newLogs.save();
      } else {
        let existsembed = new MessageEmbed()
          .setDescription(
            `<:NVInfo:717581337598492702> This server already has a log channel, remove it by doing \`${settings.prefix}removelogs\``
          )
          .setColor(config.MainColour);
        message.channel.send(existsembed);
      }
    });
  },
};
