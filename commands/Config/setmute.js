const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
const mute = require('../../models/muterole')
const Guild = require("../../models/guild");
const config = require('../../config.json')
module.exports = {
    name: "setmute",
    category: "Config",
    description: "Set the mute role for your server.",
    run: async (client, message, args) => {
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
          }
        }
      );
      let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

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
          "<:xmark:741885103545778236> You need to sepcify a role."
        )
        .setColor(config.RedColour);
 
        if(!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send(embed1)
          }
          if(!message.guild.me.hasPermission('MANAGE_GUILD')){
            message.channel.send(embed2)
        }
        
          if(!role) {
            return message.channel.send(embed3)
          }
        
            mute.findOne({ serverID: message.guild.id }, async (err, data) => {
            if(!data) {
              let newmute = new mute({
                serverName: message.guild.name,
                serverID: message.guild.id,
                roleID: role.id
              });
              let embed = new MessageEmbed()
              .setDescription(
                `<:check:741884530344067124> Mute role set to ${role}`
              )
              .setColor(config.GreenColour);
              message.channel.send(embed)
              newmute.save()
            } else {
              let existsembed = new MessageEmbed()
              .setDescription(
                `<:NVInfo:717581337598492702> <@&${data.roleID}> is the current muted role. To remove the log channel do \`${settings.prefix}removemute\``
              )
              .setColor(config.MainColour);
              message.channel.send(existsembed)
            }
          })
}}