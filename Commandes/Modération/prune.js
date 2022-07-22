const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "prune",
    description: "Permet de supprimer un nombre de messages d'un utilisateur",
    utilisation: "[membre] [nombre de messages]",
    alias: ["prune"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "Modération",

    async run(bot, message, args, db) {

        try {

            let Embed1 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Aucune personne trouvée !\*`)  

            let user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
            if(!user) return message.reply({embeds: [Embed1]})

            let Embed2 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Veuillez indiquer un nombre entre\* \`0\` \*et\* \`100\` \*!\*`)
            let Embed3 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Veuillez indiquer un nombre entre\* \`0\` \*et\* \`100\` \*!\*`)
            let Embed4 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Veuillez indiquer un nombre entre\* \`0\` \*et\* \`100\` \*!\*`)

            let number = message.user ? args._hoistedOptions[1].value : args[1];
            if(!number) return message.reply({embeds: [Embed2]})
            if(isNaN(number)) return message.reply({embeds: [Embed3]})
            if(parseInt(number) < 1 || parseInt(number) > 100) return message.reply({embeds: [Embed4]})

            await message.delete()

            try {

                let Embed5 = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setDescription(`❌ \`${user.tag}\` \*n'a envoyé aucun message dans ce salon !\*`)

                let messages = [...(await message.channel.messages.fetch()).values()].filter(m => m.author.id === user.id).slice(0, parseInt(number));
                if(messages.length <= 0) return message.channel.send({embeds: [Embed5]})

                let msg = await message.channel.bulkDelete(messages)

                let Embed6 = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setDescription(`✅ \*Le robot a supprimé\* \`${msg.size}\` \*messages de\* \`${user.tag}\` \*avec succès !\*`)

                await message.channel.send({embeds: [Embed6]}).then(async mess => setTimeout(async () => {mess.delete()}, 5000))

            } catch (err) {

                let Embed7 = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setDescription(`❌ \`${user.tag}\` \*n'a envoyé aucun message dans ce salon les 14 derniers jours !\*`)

                let messages = [...(await message.channel.messages.fetch()).values()].filter(m => m.author.id === user.id && m.createdAt > (Date.now() - 1209600000)).slice(0, parseInt(number));
                if(messages.length <= 0) return message.channel.send({embeds: [Embed7]})

                let msg = await message.channel.bulkDelete(messages)

                let Embed8 = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setDescription(`✅ \*Le robot a supprimé\* \`${msg.size}\` \*messages de\* \`${user.tag}\` \*car les autres dataient de plus de 14 jours avec succès !\*`)

                await message.channel.send({embeds: [Embed8]}).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
            }
        
        } catch (err) {

            let Embed9 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Aucune personne trouvée !\*`)

            return message.reply({embeds: [Embed9]})
        }
    }
})