const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json");
let logs = require("../../models/logchannel");
module.exports = {
  name: "addrole",
  category: "Roles",
  description: "Give a user in the server roles",
  run: async (client, message, args) => {
    await logs.findOne({ serverID: message.guild.id }, async (err, data1) => {
      const Lchannel = message.guild.channels.cache.get(data1.logChannelID);
    
   
   const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    const member = message.mentions.users.first() || message.guild.user.cache.get(args[1]);

    const permEmbed = new MessageEmbed()
    .setDescription(
        "<:xmark:741885103545778236> You don't have the correct permissions to use this command."
      )
      .setColor(config.RedColour);
    const permEmbed2 = new MessageEmbed()
    .setDescription(
        "<:xmark:741885103545778236> I don't have the correct permissions to use this command."
      )
      .setColor(config.RedColour);
    const addEmbed = new MessageEmbed()
    .setDescription(
        "<:xmark:741885103545778236> Please mention a valid user to give roles to."
      )
      .setColor(config.RedColour);
    const addEmbed2 = new MessageEmbed()
    .setDescription(
        "<:xmark:741885103545778236> Please mention a valid role to add."
      )
      .setColor(config.RedColour);



    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(permEmbed);
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply(permEmbed2)

    if (!args[0]) return message.channel.send(addEmbed);
    if (!args[1]) return message.channel.send(addEmbed2);

    let avatar = member.displayAvatarURL();

    const Suc = new MessageEmbed()
        .setDescription(
        `<:check:741884530344067124> **${member.tag}** has been give ${role}.`
      )
      .setColor(config.GreenColour);
    const Lsuc = new MessageEmbed()
    .setAuthor(message.author.tag, avatar)
        .setTitle(`Role Added`)
        .setDescription(
          `**Role** ${role} \n **Moderator:** ${message.author} *[ID ${message.author.id}]\n **User:** ${member.user} *[ID ${member.id}]*`
        )
        .setColor(config.AquaColour)
        .setTimestamp()
        .setFooter(
          `Date: ${new Intl.DateTimeFormat("en-US").format(Date.now())}`
        );

    users.roles.add(role);
    message.channel.send(Suc)
    Lchannel.send(Lsuc)
})}};