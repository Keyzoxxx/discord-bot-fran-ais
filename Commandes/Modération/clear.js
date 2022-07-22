const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "clear",
    description: "Permet de supprimer un nombre de messages",
    utilisation: "[nombre de messages]",
    alias: ["clear", "delete"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "Modération",

    async run(bot, message, args, db) {

        try {
            let Embed1 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Veuillez indiquer un nombre entre\* \`0\` \*et\* \`100\` \*!\*`)

            let Embed2 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Veuillez indiquer un nombre entre\* \`0\` \*et\* \`100\` \*!\*`)

            let Embed3 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Les messages datent de plus de 14 jours !\*`)


            let number = args[0] || args._hoistedOptions[0].value
            if(isNaN(number)) return message.reply({embeds: [Embed1]})
            if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({embeds: [Embed2]})

            try {await message.delete()} catch (err) {}

            message.channel.bulkDelete(number).catch(async err => {
                console.log(err)
                if(err) return message.reply({embeds: [Embed3]})

            }).then(async msg => {
                 
                try {
                    let Embed4 = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setDescription(`✅ ${message.author === undefined ? message.user : message.author} \*a supprimé\* \`${msg.size}\` \*messages avec succès !\*`)
                  
                    await message.reply({embeds: [Embed4]})

                  } catch (err) {
                    
                    let Embed5 = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setDescription(`✅ ${message.author === undefined ? message.user : message.author} \*a supprimé\* \`${msg.size}\` \*messages avec succès !\*`)
                  
                    await message.channel.send({embeds: [Embed5]}).then(async mess => setTimeout(async () => {mess.delete()}, 5000))
                  }
            })

        } catch (err) {
            let Embed11 = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`❌ \*Veuillez indiquer un nombre entre\* \`0\` \*et\* \`100\` \*!\*`)

            return message.reply({embeds: [Embed11]})
        }
    }
})