const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const warns = require("../../models/warn");
module.exports = {
  name: "removewarns",
  category: "Moderation",
  description: "Remove a users warnings.",
  run: async (client, message, args) => {

module.exports.run = async (bot, message, args) => {
    const permEmbed = new MessageEmbed()
        .setDescription('<:xmark:741885103545778236> You don\'t have the correct permissions to use this command.')
        .setColor(config.RedColour)

        const permEmbed1 = new MessageEmbed()
        .setDescription('<:xmark:741885103545778236> Please mention a valid user.')
        .setColor(config.RedColour)

        const permEmbed2 = new MessageEmbed()
        .setDescription('<:xmark:741885103545778236> Please provide a warn number')
        .setColor(config.RedColour)

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(permEmbed);

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);

    if (!member) return message.channel.send(permEmbed2);
    

    if (!args[1]) return message.channel.send(permEmbed1);

    const data = await warns.findOne({
        Guild: message.guild.id,
        User: member.id
    });

    if (!data) return;

    data.warns.splice(parseInt(args[1]) - 1, 1);

    await data.save();

    if (data.warns.length < 1) {
        await warns.findOneAndRemove({ Guild: message.guild.id, User: member.id });
    }

    const endEmbed = new MessageEmbed()
        .setDescription(`Removed warning **${args[1]}** from \`${member.tag}\``)
        .setColor(config.GreenColour)
    message.channel.send(endEmbed);
}
  }} 