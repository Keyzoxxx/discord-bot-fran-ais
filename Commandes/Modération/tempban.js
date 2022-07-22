const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "tempban",
  description: "Permet de bannir temporairement un utilisateur",
  utilisation: "[membre] [temps] (raison)",
  alias: ["tempban", "tp"],
  permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
  category: "Modération",
    async run(bot, message, args, db) {

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Aucune personne trouvée !\*`)

      let Embed2 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Veuillez indiquer une durée !\*`)

      let Embed3 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Le temps indiqué est invalide !\*`)

      let Embed4 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas vous bannir temporairement vous-même !\*`)

      let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas bannir temporairement cette personne !\*`)

      let Embed6 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas bannir temporairement cette personne !\*`)

      let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (message.mentions.users.first() || bot.users.cache.get(args[0]))
      if(!user) return message.reply({embeds: [Embed1]})

      let time = message.user ? args._hoistedOptions[1].value : args[1]
      if(!time) return message.reply({embeds: [Embed2]})
      if(!parseInt(ms(time))) return message.reply({embeds: [Embed3]})

      let reason = message.user ? (args._hoistedOptions.length > 2 ? args._hoistedOptions[2].value : undefined) : args.slice(2).join(" ");
      if(!reason) reason = "Aucune raison donnée";

      if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({embeds: [Embed4]})
      if(user.id === message.guild.ownerId) return message.reply({embeds: [Embed5]})
      if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({embeds: [Embed6]})

      const ID = await bot.function.createID("BAN")

      try {
        let Embed7 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Bannissement temporaire")
        .setDescription(`\*Vous avez été temporairement banni du serveur \_\_${message.guild.name}\_\_ pendant \_\_${time}\_\_ par \_\_${message.user === undefined ? message.author.tag : message.user.tag}\_\_.\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

        await user.send({embeds: [Embed7]})
      } catch (err) {}
      
      let Embed8 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Bannissement temporaire")
      .setDescription(`\*${user.tag} a été banni temporairement par ${message.user === undefined ? message.author.tag : message.user.tag} pendant ${time}.\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      await message.reply({embeds: [Embed8]})

      message.guild.members.cache.get(user.id).ban({reason: `${reason} (banni temporairement par ${message.user ? message.user.tag : message.author.tag})`})
    }
})