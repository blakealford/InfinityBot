const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "clear",
  category: "Moderation",
  description: "Clear an ammount of messages.",
  run: async (client, message, args) => {
    let inavildPerms = new MessageEmbed()
      .setDescription(
        " <:xmark:741885103545778236> You don't have the correct permissions to use this command."
      )
      .setColor(config.RedColour);
    if (
      !message.member.hasPermission("MANAGE_MESSAGES") ||
      !message.member.hasPermission("ADMINISTRATOR")
    )
      return message.channel.send(inavildPerms);
    let imputNumbers = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236> Please input a number, not a **letter** or **word.**"
      )
      .setColor(config.RedColour);
    if (isNaN(args[0])) return message.channel.send(imputNumbers);
    let numberLessThen100 = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236> Insert the number less than **100.**"
      )
      .setColor(config.RedColour);
    if (args[0] > 100) return message.channel.send(numberLessThen100);
    let numberMoreThen1 = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236>  Insert the number more than **1.**"
      )
      .setColor(config.RedColour);
    if (args[0] < 2) return message.channel.send(numberMoreThen1);
    let error = new MessageEmbed()
      .setDescription(
        `<:xmark:741885103545778236> Something went wrong while deleting the messages.`
      )
      .setColor(config.RedColour);
    await message.delete();
    await message.channel.bulkDelete(args[0]);

    let succesfull = new MessageEmbed()
      .setDescription(
        `<:check:741884530344067124> I have deleted succesfully deleted **${message.size}/${args[0]}**`
      )
      .setColor(config.GreenColour);
    message.channel.send(succesfull).then((d) => d.delete({ timeout: 10000 }));
    console.log(message.size)
  }}