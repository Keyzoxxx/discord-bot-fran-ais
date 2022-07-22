const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "snipe",
    description: "Permet de connaître le dernier message supprimé du salon",
    utilisation: "",
    alias: ["snipe"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "Modération",

    async run(bot, message, args, db) {

        let msg = await bot.snipe.get(message.channel.id)
        
        let Embed1 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription('❌ \*Aucun message supprimé récemment !\*')

        if(!msg) return message.reply({embeds: [Embed1]})

        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`***Voici le dernier message supprimé sur ce salon :***\n\n***Auteur :*** *${msg.author.tag}*\n***Contenu du message :*** \`\`\`${msg.content}\`\`\``)
        .setImage(msg.attachments?.first()?.proxyURL)

        await message.reply({embeds: [Embed]})
    }
})