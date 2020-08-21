const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json");
let muted = require("../../models/muterole");
let logs = require("../../models/logchannel");
let Guild = require("../../models/guild");
module.exports = {
  name: "mute",
  category: "Moderation",
  description: "Mute a user in the server",
  run: async (client, message, args) => {
    await logs.findOne({ serverID: message.guild.id }, async (err, data1) => {
      const Lchannel = message.guild.channels.cache.get(data1.logChannelID);
  
    const settings = await Guild.findOne(
      {
        guildID: message.guild.id,
      },
      (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: config.prefix,
          });

          newGuild
            .save()
            .then((result) => console.log(result))
            .catch((err) => console.error(err));
        }
      }
    );

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
      .setDescription("<:xmark:741885103545778236> You can't mute yourself.")
      .setColor(config.RedColour);

    const embed4 = new MessageEmbed()
      .setDescription("<:xmark:741885103545778236> You can't mute me.")
      .setColor(config.RedColour);

    const embed5 = new MessageEmbed()
      .setDescription(
        `Please ensure that you have selected a Muted Role by doing \`${settings.prefix}\``
      )
      .setColor(config.RedColour);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(ban1);
    }
    let user = message.mentions.members.first() || message.member;
    let reason = message.content.split(" ").slice(2).join(" ");
    if (user.id === message.author.id) return message.channel.send(embed3);
    if (user.id === client.user.id) return message.channel.send(embed4);
    if (!user) return message.channel.send(embed);
    if (!reason) reason = "No reason provided";
    await muted.findOne(
      { serverID: message.guild.id },
      async (err, data1) => {
        if (!data1) {
          message.channel.send(embed5);
        }
        await logs.findOne(
          { serverID: message.guild.id },
          async (err, data) => {

            let muterole = message.guild.roles.cache.get(data1.roleID);
            let muted = new MessageEmbed()
              .setDescription(
                `<:check:741884530344067124> **${user.tag}** has been muted.`
              )
              .setColor(config.GreenColour);
            let avatar = user.user.displayAvatarURL()

            if (!data) {
              message.channel.send(muted);
              user.roles.add(muterole);
            }
            if ((data, data1)) {
              user.roles.add(muterole);

              message.channel.send(muted);

              user.send(
                `You were muted in ${message.guild.name} for: ${reason}`
              );

              const muted2 = new MessageEmbed()
                .setAuthor(`${member.tag}`, avatar)
                .setTimestamp()
                .setFooter(
                  `Date: ${new Intl.DateTimeFormat("en-US").format(Date.now())}`
                )
                .setTitle("User Muted")
                .setDescription(
                  `**Moderator:** ${message.author} *[ID ${message.author.id}]*
                \n**Member:** ${user.user} *[ID ${user.user.id}]*\n**Reason:** \`⚠️\`||${reason}||
              `
                )
                .setColor(config.YellowColour);
              Lchannel.send(muted2);
            }
          }
        );
      }
    );
  },

    )}}