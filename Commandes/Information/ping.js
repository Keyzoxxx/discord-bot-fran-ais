const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "ping",
  description: "Permet de connaître la latence du bot",
  utilisation: "",
  alias: ["ping"],
  permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
  category: "Information",
  
  async run(bot, message, args, db) {

    const startTimeDB = Date.now()

    async (err, req) => {

      const endTimeDB = Date.now()

      const startTime = Date.now()

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`⚙️ \*En cours...\*`)

      await message.reply({embeds: [Embed1]}).then(async msg => {
  
        const endTime = Date.now()
  
        try {
          let Embed2 = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle("Latence du bot")
          .setDescription(`\*Latence du bot :\* \`${endTime - startTime}ms\`.\n\*Latence de l'API de Discord :\* \`${bot.ws.ping}ms\`.\n\*Latence de la base de données :\* \`${endTimeDB - startTimeDB}ms\`.`)
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

          await msg.edit({embeds: [Embed2]})
        } catch (err) {
          let Embed3 = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle('Latence du bot')
          .setDescription(`\*Latence du bot :\* \`${endTime - startTime}ms\`.\n\*Latence de l'API de Discord :\* \`${bot.ws.ping}ms\`.\n\*Latence de la base de données :\* \`${endTimeDB - startTimeDB}ms\`.`)
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

          await message.editReply({embeds: [Embed3]})
        }
      })
    }}})
