const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
const mute = require('../../models/muterole')
const Guild = require("../../models/guild");
const config = require('../../config.json')
module.exports = {
    name: "removemute",
    category: "config",
    description: "Remove the mute role for your server You can re set this by doing -setmuterole ",
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
  
  if(!message.member.hasPermission('MANAGE_GUILD')) {
    return message.channel.send(embed1)
  }
  if(!message.guild.me.hasPermission('MANAGE_GUILD')){
    message.channel.send(embed2)
}

    await mute.deleteOne({ serverID: message.guild.id }, async (err, data) => {
    if(!data) {
        const NoData = new MessageEmbed()
        .setDescription(
            `A muted role has not be set for \`${message.guild.name}\`. To set one run \`${settings.prefix}setmute\`.`
          )
          .setColor(config.GreenColour)
   
    } else {
      
      let Deletedembed = new MessageEmbed()
      .setDescription(
        `<:check:741884530344067124> I have disabled the muted role for \`${message.guild.name}\`, to re enable run \`${settings.prefix}setlogs\``
      )
      .setColor(config.GreenColour);

      message.channel.send(Deletedembed)
      mute.deleteOne()
    }
  })
}
}