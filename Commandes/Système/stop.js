const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "stop",
  description: "Permet de stopper le bot",
  utilisation: "",
  alias: ["stop"],
  permission: "Développeur",
  category: "Système",
  
  async run(bot, message, args, db) {

    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`✅ \*Le bot a été arrêté avec succès !\*`)

    await message.reply({embeds: [Embed]})
    
    await require("child_process").execSync("pm2 stop KeyzoxProtect")
  }
})