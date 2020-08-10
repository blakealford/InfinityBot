const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const logs = require("../../models/logchannel")
module.exports = {
  name: "kick",
  category: "Moderation",
  description: "Kick a user from the server",
  run: async (client, message, args) => {
    await logs.findOne({ serverID: message.guild.id }, async (err, data1) => {
      const Lchannel = message.guild.channels.cache.get(data1.logChannelID);

      const ban1 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> You don't have the correct permissions to use this command."
        )
        .setColor(config.RedColour);

      const ban2 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> Please mention a valid user."
        )
        .setColor(config.RedColour);

      const embed3 = new MessageEmbed()
        .setDescription("<:xmark:741885103545778236> You can't kick yourself.")
        .setColor(config.RedColour);

      const embed4 = new MessageEmbed()
        .setDescription("<:xmark:741885103545778236> You can't kick me.")
        .setColor(config.RedColour);

      if (
        !message.member.hasPermission("KICK_MEMBERS") ||
        !message.member.hasPermission("ADMINISTRATOR")
      )
        return message.channel.send(ban1);
      let user = message.mentions.users.first();
      let member = message.guild.member(user);
      let reason = args.slice(1).join(" ");

      if (!user) return message.channel.send(ban2);
      if (user.id === message.author.id) return message.channel.send(embed3);
      if (user.id === client.user.id) return message.channel.send(embed4);

      if (!reason) reason = " No Reason Provided";
      let avatar = user.displayAvatarURL();

      let embed21 = new MessageEmbed()
        .setAuthor(`${user.tag}`, avatar)
        .setTimestamp()
        .setFooter(`Date: ${new Intl.DateTimeFormat(
          "en-US"
        ).format(Date.now())}`)
        .setTitle("User Kicked")
        .setDescription(
          `**Moderator:** ${message.author} *[ID ${message.author.id}]*
          \n**Member:** ${user} *[ID ${
            user.id
          }]*\n**Reason:** \`⚠️\`||${reason}||
        `)
        .setColor(config.YellowColour);

      const embed5 = new MessageEmbed()
        .setDescription(
          `<:xmark:741885103545778236> I was unable to kick ${user}`
        )
        .setColor(config.RedColour);
      let embed98 = new MessageEmbed()
        .setDescription(
          `<:check:741884530344067124> **${user.tag}** has been kick.`
        )
        .setColor(config.GreenColour);

      member
        .ban(reason)
        .then(() => {
          message.channel.send(embed98);
          Lchannel.send(embed21);
          user.send(`You were kicked in ${message.guild.name} for: ${reason}`);
        })
        .catch((err) => {
          message.reply(embed5);
        });
    });
  },
};