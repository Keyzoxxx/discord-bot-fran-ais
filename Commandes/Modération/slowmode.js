const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = {
  name: "slowmode",
  description : "Permet de mettre un mode lent sur le salon",
  utilisation: "<time>",
  alias: ["slowmode", "cooldown"],
  permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
  category: "Information",

  run: (bot, message, args, db) => {

    const amount = parseInt(args[0]);
    let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Saisissez uniquement des nombres !\*`)    
    if (isNaN(amount))
      return message.reply({embeds: [Embed1]});
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        let Embed2 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le slowmode est maintenant défini sur\* ` + amount + ` \*secondes !\*`)
        
        message.reply({embeds: [Embed2]});
        return
      } else {
        let Embed3 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le slowmode est maintenant défini sur\* ` + amount + ` \*seconde !\*`)
        
        message.reply({embeds: [Embed3]});
        return
      }
    }
    if (args[0] === amount + "m") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        let Embed4 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le slowmode est maintenant défini sur\* ` + amount + ` \*minutes !\*`)
        
        message.reply({embeds: [Embed4]});
        return
      } else {
        let Embed5 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le slowmode est maintenant défini sur\* ` + amount + ` \*minute !\*`)
        
        message.reply({embeds: [Embed5]});

        return
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        let Embed6 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le slowmode est maintenant défini sur\* ` + amount + ` \*heures !\*`)
        
        message.reply({embeds: [Embed6]});
        return
      } else {
        let Embed7 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le slowmode est maintenant défini sur\* ` + amount + ` \*heure !\*`)
        
        message.reply({embeds: [Embed7]});
        return
      }
    } else {
      let Embed8 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez uniquement utiliser cette commande avec des secondes ➔ (s), minutes ➔ (m) et heures ➔ (h) !\*`)
      
      message.reply({embeds: [Embed8]});
    }
  }
};