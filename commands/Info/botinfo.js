const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");

module.exports = {
  name: "botinfo",
  category: "Info",
  description: "Get bot Info & Stats",
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
    
      guild.save();
      
      function parseDur(ms) {
        let seconds = ms / 1000,
          days = parseInt(seconds / 86400);
        seconds = seconds % 86400
    
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600
    
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60)
    
        if (days) {
          return `${days} day, ${hours} hours, ${minutes} minutes`
        } else if (hours) {
          return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
        } else if (minutes) {
          return `${minutes} minutes, ${seconds} seconds`
        }
    
        return `${seconds} second(s)`
      }        


      let avatar = message.author.displayAvatarURL({ dynamic: true, size: 512 });
      const userinfo = new MessageEmbed()
        .setAuthor(`Infinity Stats`, avatar)
        .addField("Version", "Version 1.0.0", true)
        .addField("Library", "Discord.js", true)
        .addField("Creator/Developer", "Zylo#0001", true)
        .addField("Users", client.users.cache.size, true)
        .addField("Servers", client.guilds.cache.size, true)
        .addField("Channels", client.channels.cache.size, true)
        .addField("Uptime", parseDur(client.uptime))
        .setColor(config.MainColour)

      message.channel.send(userinfo)
    
    
    
    
    
      return;
    



  })}}