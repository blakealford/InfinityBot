const { MessageEmbed, Message } = require("discord.js");
const warns = require("../../models/warn");
const config = require("../../config.json");
module.exports = {
  name: "warns",
  category: "Moderation",
  description: "Check a users warns",
  run: async (client, message, args) => {
let user = message.mentions.members.first() || message.author;
let noactive = new MessageEmbed()
.setDescription(
  `<:NVInfo:717581337598492702> **${user.tag}** has no active warns in \`${message.guild.name}\`.`
  )
.setColor(config.MainColour)
if (!user) return message.channel.send(`No user specified!`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
  
        return message.channel.send(noactive)
        let avatar = user.user.displayAvatarURL({ dynamic: true, size: 512 });
        let Embed = new MessageEmbed()
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `**Warn** **__${i}__**\n **Moderator:** ${
                    message.guild.members.cache.get(w.Moderator).user
                  } **Reason:** ${
                    w.Reason
                  }`
              ).join("\n");
            })
          ).setAuthor(`Warnings For ${user.user.tag}`, avatar)
          .setColor(config.MainColour)
          .setFooter(`ID ${user.id}`)
          

        message.channel.send(Embed);
      }
    );
  },
};
