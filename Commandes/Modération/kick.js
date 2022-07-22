const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "kick",
  description: "Permet d'expulser un utilisateur",
  utilisation: "[membre] (raison)",
  alias: ["kick"],
  permission: Discord.Permissions.FLAGS.KICK_MEMBERS,
  category: "Modération",

  async run(bot, message, args, db) {

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Aucune personne trouvée !\*`)

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous ne pouvez pas vous expulser vous-même !\*`)

    let Embed3 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌\*Vous ne pouvez pas expulser cette personne !\*`)

    let Embed4 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous ne pouvez pas expulser cette personne !\*`)
    
    let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
    if(!user) return message.reply({embeds: [Embed1]})

    let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
    if(!reason) reason = "Aucune raison donnée";

    if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({embeds: [Embed2]})
    if(user.id === message.guild.ownerId) return message.reply({embeds: [Embed3]})
    if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({embeds: [Embed4]})

    try {
      let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Expulsion")
      .setDescription(`\*Vous avez été expulsé du serveur \_\_${message.guild.name}\_\_ par \_\_${message.user === undefined ? message.author.tag : message.user.tag}\_\_.\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))


      await user.send({embeds: [Embed5]})
    } catch (err) {}

    let Embed6 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Expulsion")
    .setDescription(`\*${user.tag} a été expulsé par ${message.user === undefined ? message.author.tag : message.user.tag}.\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    
    
    await message.reply({embeds: [Embed6]})

    await message.guild.members.cache.get(user.id).kick(`${reason} (Expulsé par ${message.user === undefined ? message.author.tag : message.user.tag})`)

    if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")
  
  }
})