const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "reload",
  description: "Permet de recharger un commande",
  utilisation: "[commande]",
  alias: ["reload", "re"],
  permission: "Développeur",
  category: "Système",
  
  async run(bot, message, args, db) {

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Veuillez indiquer une commande !\*`)

    const command = bot.alias.get(message.user ? args._hoistedOptions[0].value : args[0])
    if(!command) return message.reply({embeds: [Embed1]})

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`⚙️ \*En cours...\*`)

    await message.reply({embeds: [Embed2]}).then(async msg => {

        delete require.cache[require.resolve(`./${command.name}.js`)]
        bot.commands.delete(command.name)

        const pull = require(`./${command.name}.js`)
        bot.commands.get(pull.name, pull)

        try {
            let Embed3 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`✅ \*La commande\* \`${command.name}.js\` \*a été rechargée avec succès !\*`)

            await msg.edit({embeds: [Embed3]})
        } catch (err) {
            let Embed4 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`✅ \*La commande\* \`${command.name}.js\` \*a été rechargée avec succès !\*`)

            await message.editReply({embeds: [Embed4]})
        }
    })
  }
})