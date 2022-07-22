const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({
  
  name: 'pfc',
  description: 'Permet de faire le jeu pierre, feuille, ciseaux avec le bot',
  utilisation: '<p|f|c>',
  alias: ["pfc"],
  permission: 'Aucune',
  category: 'Fun',

  async run(bot, message, args, db) {

    const random = ["pierre", "feuille", "ciseaux"]
    const result = random[Math.floor(Math.random() * random.length)];
    const choix = args[0];

    if (choix === "ciseaux" || choix === "c" & result === "feuille") {
      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`👏 ${result}, tu a gagné !`)

      message.reply({embeds: [Embed1]})
    }
    if (choix === "ciseaux" || choix === "c" & result === "pierre") {
      let Embed2 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ ${result}, j'ai gagné !`)
     
      message.reply({embeds: [Embed2]})
    }
    if (choix === "ciseaux" || choix === "c" & result === "ciseaux") {
      let Embed3 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`⭕ ${result}, égalité !`)
      
      message.reply({embeds: [Embed3]})
    }
    if (choix === "pierre" || choix === "p" & result === "ciseaux") {
      let Embed4 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`👏 ${result}, tu a gagné !`)
      
      message.reply({embeds: [Embed4]})
    }
    if (choix === "pierre" || choix === "p" & result === "feuille") {
      let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ ${result}, j'ai gagné !`)
      
      message.channel.sendreply({embeds: [Embed5]})
    }
    if (choix === "pierre" || choix === "p" & result === "pierre") {
      let Embed6 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`⭕ ${result}, égalité !`)
      
      message.reply({embeds: [Embed6]})
    }
    if (choix === "feuille" || choix === "f" & result === "pierre") {
      let Embed7 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`👏 ${result}, tu a gagné !`)
     
      message.reply({embeds: [Embed7]})
    }
    if (choix === "feuille" || choix === "f" & result === "ciseaux") {
      let Embed8 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ ${result}, j'ai gagné !`)
      
      message.reply({embeds: [Embed8]})
    }
    if (choix === "feuille" || choix === "f" & result === "feuille") {
      let Embed9 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`⭕ ${result}, égalité !`)
      
      message.reply({embeds: [Embed9]})
    }
  }
})  