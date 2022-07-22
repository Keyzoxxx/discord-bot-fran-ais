const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "restart",
  description: "Permet de redémarrer le bot",
  utilisation: "",
  alias: ["restart"],
  permission: "Développeur",
  category: "Système",
  
  async run(bot, message, args, db) {

    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`✅ \*Le bot a été redémarré avec succès !\*`)

    await message.reply({embeds: [Embed]})
    
    await require("child_process").execSync("pm2 restart KeyzoxProtect")
  }
})