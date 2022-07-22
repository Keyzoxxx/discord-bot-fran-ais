const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "warn",
  description: "Permet d'avertir un utilisateur",
  utilisation: "[membre], [raison]",
  alias: ["warn", "warning"],
  permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
  category: "Modération",
  
  async run(bot, message, args, db) {

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Aucune personne trouvée !\*`)

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Aucune personne trouvée !\*`)

    let Embed3 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous ne pouvez pas vous avertir vous-même !\*`)

    let Embed4 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous ne pouvez pas bannir cette personne !\*`)

    let Embed5 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous ne pouvez pas bannir cette personne !\*`)
    
    let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (bot.users.cache.get(args[0]) || message.mentions.users.first())
    if(!user) return message.reply({embeds: [Embed1]})
    if(!message.guild.members.cache.get(user.id)) return message.reply({embeds: [Embed2]})

    let reason = message.user ? args._hoistedOptions.length >= 2 ? args._hoistedOptions[1].value : undefined : args.slice(1).join("")
        if(!reason) reason = "Aucune raison donnée";


    if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({embeds: [Embed3]})
    if(user.id === message.guild.ownerId) return message.reply({embeds: [Embed4]})
    if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({embeds: [Embed5]})

    let Embed6 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Avertissement")
    .setDescription(`\*${message.user ? message.user.tag : message.author.tag} a averti ${user.tag}.\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    
    await message.reply({embeds: [Embed6]})
    try {
      let Embed7 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Avertissement")
      .setDescription(`\*Vous avez été averti dans le serveur \_\_${message.guild.name}\_\_ par \_\_${message.user ? message.user.tag : message.author.tag}\_\_.\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      await user.send({embeds: [Embed7]})
    } catch (err) {}
   
  }
})