const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "prefix",
  description: "Permet de changer le prefix du bot",
  utilisation: "[préfixe]",
  alias: ["prefix", "setprefix", "sp"],
  permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
  category: "Système",
  
  async run(bot, message, args, db) {

    async (err, req) => {

      try {
        let Embed1 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`❌ \*Veuillez indiquer un préfixe !\*`)
        
        let prefix = args[0] || args._hoistedOptions[0].value
        if(!prefix) return message.reply({embeds: [Embed1]})

        const ancienprefix = req[0].prefix;

        let Embed2 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Vous avez modifié le préfixe avec succès ! C'est passé de\* \`${ancienprefix}\` \*à\* \`${prefix}\` \*!\*`)

        db.query(`UPDATE serveur SET prefix = '${prefix}' WHERE guildID = ${message.guild.id}`)

        message.reply({embeds: [Embed2]})

      } catch (err) {
        let Embed3 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`❌ \*Veuillez indiquer un préfixe !\*`)

        return message.reply({embeds: [Embed3]})
      }
}}    })
