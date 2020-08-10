const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const logs = require("../../models/logchannel");
module.exports = {
  name: "clear",
  category: "Moderation",
  description: "Clear an ammount of messages.",
  run: async (client, message, args) => {
    await logs.findOne({ serverID: message.guild.id }, async (err, data1) => {
      const Lchannel = message.guild.channels.cache.get(data1.logChannelID);
      let inavildPerms = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> You don't have the correct permissions to use this command."
        )
        .setColor(config.RedColour);

      let imputNumbers = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> Please input a number, not a **letter** or **word.**"
        )
        .setColor(config.RedColour);

      let numberLessThen100 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> Insert the number less than **100.**"
        )
        .setColor(config.RedColour);

      let numberMoreThen1 = new MessageEmbed()
        .setDescription(
          "<:xmark:741885103545778236> Insert the number more than **1.**"
        )
        .setColor(config.RedColour);

      let error = new MessageEmbed()
        .setDescription(
          `<:xmark:741885103545778236> Something went wrong while deleting the messages.`
        )
        .setColor(config.RedColour);

      if (
        !message.member.hasPermission("MANAGE_MESSAGES") ||
        !message.member.hasPermission("ADMINISTRATOR")
      )
        return message.channel.send(inavildPerms);
      if (isNaN(args[0])) return message.channel.send(imputNumbers);
      if (args[0] > 100) return message.channel.send(numberLessThen100);
      if (args[0] < 2) return message.channel.send(numberMoreThen1);

      await message.channel.bulkDelete(args[0]);

      let avatar = message.author.displayAvatarURL({
        dynamic: true,
        size: 512,
      });

      let succesfull = new MessageEmbed()
        .setDescription(
          `<:check:741884530344067124> I have deleted **${args[0]}** messages.`
        )
        .setColor(config.GreenColour);

      let succesfull2 = new MessageEmbed()
        .setAuthor(message.author.tag, avatar)
        .setTitle(`Messages Purged/Cleared`)
        .setDescription(
          `**Amount:** ${args[0]}\n **Moderator:** ${message.author} *[ID ${message.author.id}]*`
        )
        .setColor(config.AquaColour)
        .setTimestamp()
        .setFooter(
          `Date: ${new Intl.DateTimeFormat("en-US").format(Date.now())}`
        );
      Lchannel.send(succesfull2);
      message.channel
        .send(succesfull)
        .then((d) => d.delete({ timeout: 10000 }));
    });
  },
};
