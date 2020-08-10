const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const { info } = require("../../../../../Desktop/arismaarisma-master/commands/help");

module.exports = {
  name: "help",
  category: "Help",
  description: "Help message",
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
    
      let avatar = message.author.displayAvatarURL({ dynamic: true, size: 512 });
        const help1 = new MessageEmbed()
        .setAuthor(`Infinity Help Menu`, avatar)
        .setDescription(`\n\n - **${message.guild.name} Prefix:** \`${settings.prefix}\`.\n- **Patch Logs:** Do \`${settings.prefix}patchlog\` and see whats new.\n- **Support:** Need extra help? Join our [Support Server.](https://discord.gg/n6uz4gK)\n - **Command Help:** To get info on commands run \`${settings.prefix}help <command name>\`.`)
        .addField("Information Commands:", `\`${settings.prefix}botinfo\`, \`${settings.prefix}membercount\`, \`${settings.prefix}serverinfo\`, \`${settings.prefix}userinfo\``)
        .addField("Moderation Commands:", `\`${settings.prefix}ban\`, \`${settings.prefix}clear\`, \`${settings.prefix}warn\`, \`${settings.prefix}infractions\`, \`${settings.prefix}kick\`, \`${settings.prefix}mute\`, \`${settings.prefix}unmute\`, \`${settings.prefix}tempmute\`,\n \`${settings.prefix}slowmode\``)
        .addField("Fun Commands:", `\`Coming Soon\``)
        .addField("Config Commands:", `\`${settings.prefix}setlogs\`, \`${settings.prefix}removelogs\`, \`${settings.prefix}setmute\`, \`${settings.prefix}removemute\`,  \`${settings.prefix}prefix\``)
        .setColor(config.MainColour)
        message.channel.send(help1)
    }}