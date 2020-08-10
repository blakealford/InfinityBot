const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const warns = require("../../models/warn");
const logs = require("../../models/logchannel");
module.exports = {
  name: "warn",
  category: "Moderation",
  description: "Warn a user.",
  run: async (client, message, args) => {
    await logs.findOne({ serverID: message.guild.id }, async (err, data1) => {
      const Lchannel = message.guild.channels.cache.get(data1.logChannelID);
      const embed1 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> You don't have the correct permissions to use this command."
        )
        .setColor(config.RedColour);

      const embed2 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> Please mention a valid user."
        )
        .setColor(config.RedColour);

      const embed3 = new MessageEmbed()
        .setDescription("<:xmark:741885103545778236> You can't warn yourself.")
        .setColor(config.RedColour);

      const embed4 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> Please provide a reason to warn someone."
        )
        .setColor(config.RedColour);

      if (
        !message.member.hasPermission("MANAGE_MESSAGES") ||
        !message.member.hasPermission("ADMINISTRATOR")
      )
        return message.channel.send(embed1);
      let user = message.mentions.users.first();

      if (!user) return message.channel.send(embed2);
      if (user.id === message.author.id) return message.channel.send(embed3);
      if (user.id === client.user.id) return message.channel.send();

      if (!args.slice(1).join(" ")) return message.channel.send(embed4);
      warns.findOne(
        { Guild: message.guild.id, User: user.id },
        async (err, data) => {
          if (err) console.log(err);
          if (!data) {
            let newWarns = new warns({
              User: user.id,
              Guild: message.guild.id,
              Warns: [
                {
                  Moderator: message.author.id,
                  Reason: args.slice(1).join(" "),
                },
              ],
            });
            newWarns.save();
            let avatar = user.displayAvatarURL({ dynamic: true, size: 512 });

            let embed2 = new MessageEmbed()
              .setAuthor(user.tag, avatar)
              .setTitle("User Warned")
              .setFooter(`Date: ${new Intl.DateTimeFormat(
                "en-US"
              ).format(Date.now())}`)
              .setDescription(
                `**Moderator:** ${message.author} *[ID ${message.author.id}]*
                \n**Member:** ${user} *[ID ${user.id}]*
                \n**Reason:** \`⚠️\`||${args
                  .slice(1)
                  .join(" ")}||\n**Warnings:** This is their __first__ warning.`
              )
              .setColor(config.MainColour);

            let embed98 = new MessageEmbed()
              .setDescription(
                `<:check:741884530344067124> **${user.tag}** has been warned.`
              )
              .setColor(config.GreenColour);

            message.channel.send(embed98);
            Lchannel.send(embed2);
          } else {
            data.Warns.unshift({
              Moderator: message.author.id,
              Reason: args.slice(1).join(" "),
            });
            let avatar = user.displayAvatarURL({ dynamic: true, size: 512 });

            let embed98 = new MessageEmbed()
              .setDescription(
                `<:check:741884530344067124> **${user.tag}** has been warned.`
              )
              .setColor(config.GreenColour);

            let embed1 = new MessageEmbed()
              .setAuthor(user.tag, avatar)
              .setTitle("User Warned")
              .setTimestamp()
              .setFooter(`Date: ${new Intl.DateTimeFormat(
                "en-US"
              ).format(Date.now())}`)
              .setDescription(
                `**Moderator:** ${
                  message.author 
                } *[ID ${message.author.id}]*\n**Member:** ${user} *[ID ${user.id}]*\n**Reason:** \`⚠️\`||${args
                  .slice(1)
                  .join(" ")}||\n**Warnings:** They now have __${
                  data.Warns.length
                }__ warning(s)`
              )
              .setColor(config.RedColour);

            data.save();
            message.channel.send(embed98);
            Lchannel.send(embed1);
            user.send(
              `You were warned in ${message.guild.name} for: ${args
                .slice(1)
                .join(" ")}`
            );
          }
        }
      );
    });
  },
};
