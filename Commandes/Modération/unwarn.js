const Discord = require(`discord.js`)
const Command = require(`../../Structure/Command`)

module.exports = new Command({

    name: "unwarn",
    description: "Permet de supprimer le dernier avertissement reçu par un utilisateur",
    utilisation: "[membre] (raison)",
    alias: ["unwarn", "unwarning"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "Modération",

    async run(bot, message, args, db){

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Aucune personne trouvée !\*`)

      let Embed2 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Aucune personne trouvée !\*`)

      let Embed3 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas interagir avec vous-même !\*`)

      let Embed4 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas interagir avec cette personne !\*`)

      let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Vous ne pouvez pas interagir avec cette personne !\*`)


        let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (bot.users.cache.get(args[0]) || message.mentions.users.first())
        if(!user) return message.reply({embeds: [Embed1]})
        if(!message.guild.members.cache.get(user.id)) return message.reply({embeds: [Embed2]})

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "Aucune raison donnée";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({embeds: [Embed3]})
        if(user.id === message.guild.ownerID) return message.reply({embeds: [Embed4]})
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({embeds: [Embed5]})

      async (err, req) => {
            
          let Embed6 = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription(`❌ \*${user.tag} n'a aucune sanction sur ${message.guild.name} !\*`)

          if(req.length <= 0) return message.reply({embeds: [Embed6]})

          try {
            let Embed7 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle("Suppression avertissement")
            .setDescription(`\*${message.user === undefined ? message.author.tag : message.user.tag} vous a enlevé un avertissement dans le serveur ${message.guild.name}. (${req.length - 1} restant${req.length - 1 > 1 ? "s" : ""})\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
            .setTimestamp()
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    
            
            await user.send({embeds: [Embed7]})
          } catch (err) {}
            
            let sql = `DELETE FROM warns WHERE userID = ${user.id} AND guildID = ${message.guild.id} ORDER BY date DESC LIMIT 1`
            db.query(sql, function(err) {
                if(err) throw err;
                let Embed8 = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle("Suppression avertissement")
                .setDescription(`\*${message.user === undefined ? message.author.tag : message.user.tag} a supprimé un avertissement de ${user.tag}. (${req.length - 1} restant${req.length - 1 > 1 ? "s" : ""})\*\n\n\*\*Raison :\*\* \*${reason}.\*`)
                .setTimestamp()
                .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    
                
                message.reply({embeds: [Embed8]})
            })    
 }}       })
 