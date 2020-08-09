const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
  name: "prefix",
  category: "Config",
  description: "Set the server prefix per server",
  run: async (client, message, args) => {
    const embed5 = new MessageEmbed()
      .setDescription(
        "<:xmark:741885103545778236> You don\'t have the correct permissions to use this command."
      )
      .setColor(config.RedColour);
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(embed5);
    }

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

          return;
        }
      }
    );

    if (args.length < 1) {
      const embed3 = new MessageEmbed()
        .setDescription(
          `<:NVInfo:717581337598492702> The current prefix is \`${settings.prefix}\`.`
        )
        .setColor(config.MainColour);

      return message.channel.send(embed3);
    }

    await settings.updateOne({
      prefix: args[0],
    });
    const embed2 = new MessageEmbed()
      .setDescription(
        `<:check:741884530344067124> Changed the server prefix to \`${args[0]}\`.`
      )
      .setColor(config.GreenColour);
    return message.channel.send(embed2);
  },
};
//<:NVInfo:717581337598492702> || <:check:314349398811475968>
