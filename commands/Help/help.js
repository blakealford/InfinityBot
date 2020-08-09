const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");

module.exports = {
  name: "help",
  category: "Help",
  description: "Help Command",
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
        .setAuthor(`Help Menu`, avatar)
        .setDescription(`Welcome to **Infinitys** help menu! All the help you need in 1 place.\n\n - **${message.guild.name} Prefix:** \`${settings.prefix}\`.\n- **Patch Logs:** Do \`${settings.prefix}patchlog\` and see whats new.\n- **Support:** Need extra help? Join our [Support Server.](https://discord.gg/n6uz4gK)\n - **Command Help:** To get info on commands run \`${settings.prefix}help <command name>\`.`)
        .addField("Information Commands:", `\`\`\`${settings.prefix}help info\`\`\``)
        .addField("Moderation Commands:", `\`\`\`${settings.prefix}help moderation\`\`\``)
        .addField("Fun Commands:", `\`\`\`${settings.prefix}help fun\`\`\``)
        .addField("Config Commands:", `\`\`\`${settings.prefix}help config\`\`\``)
        .setColor(config.MainColour)
        message.channel.send(help1)


      if (args.length > 0) {
        if (args[0] === "info") {

        }}
    
    }}