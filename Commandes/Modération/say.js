const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "say",
    description: "Permet d'envoyer un message avec l'identité du bot",
    utilisation: "[message]",
    alias: ["say"],
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "Modération",

    async run(bot, message, args, db) {
      if(!args[0]) {
        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`❌ \*Veuillez inclure ce que vous voulez que je dise !\*`)

        return message.reply({embeds: [Embed]})
      }
      message.channel.send(args.slice(0).join(" "))
      message.delete()
    }
})