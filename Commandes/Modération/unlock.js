const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "unlock",
    description: "Permet de unlocker un salon",
    utilisation: "[channel] (reason)",
    alias: ["unlock"],
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "Modération",

    async run(bot, message, args, db) {

        let Embed1 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`❌ \*Aucun salon trouvé !\*`)

        let Embed2 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`❌ \*Ce salon est déjà unlocké !\*`)
        
        let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
        if(!channel) return message.reply({embeds: [Embed1]})

        let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ");
        if(!reason) reason = "Aucune raison donnée";

        if(channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id)?.allow.toArray(false).includes("SEND_MESSAGES")) return message.reply({embeds: [Embed2]})

        await channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
            SEND_MESSAGES: true
        })

        let Embed3 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`✅ \*Le salon a été unlock avec succès !\*`)
        
        let Embed4 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Unlock')
        .setDescription(`\*Ce salon a été unlocké par ${message.user ? message.user : message.author}.\*\n\*\*Raison :\*\* \*${reason}.\*`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        
        await message.reply({embeds: [Embed3]})
        await channel.send({embeds: [Embed4]})
    }
})