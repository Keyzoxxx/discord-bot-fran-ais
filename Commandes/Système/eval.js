const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "eval",
  description: "Permet d'évaluer un code",
  utilisation: "[code]",
  alias: ["eval", "e"],
  permission: "Développeur",
  category: "Système",
  
  async run(bot, message, args, db) {

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Veuillez indiquer un code !\*`)
    
    const code = message.user ? args._hoistedOptions[0].value : args.slice(0).join(" ")
    if(!code) return message.reply({embeds: [Embed1]})

    try {
      
      let Embed2 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas obtenir le token du bot !\*`)
      
      let output = eval(code)
      if(typeof output !== 'string') output = require("util").inspect(output, {depth: 0})

      if(output.includes(bot.token)) return message.reply({embeds: [Embed2]})

      let Embed3 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Évaluation d'un code")
      .setDescription(`\*Code donné :\* \`\`\`js\n${code}\`\`\`\n\*Code reçu :\* \`\`\`js\n${output}\`\`\``)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      message.reply({embeds: [Embed3]})
    } catch (err) {

      let Embed4 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Évaluation d'un code")
      .setDescription(`\*Code donné :\* \`\`\`js\n${code}\`\`\`\n\*Code reçu :\* \`\`\`js\n${err}\`\`\``)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      message.reply({embeds: [Embed4]})
    }
  }
})