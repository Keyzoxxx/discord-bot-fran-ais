const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "help",
    description: "Permet de connaître toutes les commandes du bot",
    utilisation: "",
    alias: ["help", "h", "aide"],
    permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
    category: "Information",

    async run(bot, message, args, db) {

        const command = message.user ? bot.alias.get(args._hoistedOptions.length !== 0 ? args._hoistedOptions[0].value : "") : bot.alias.get(args[0])
        async (err, req) => {

            if (!command) {

                const categories = [];
                const commands = bot.commands;

                commands.forEach((command) => {
                    if (!categories.includes(command.category)) {
                        categories.push(command.category);
                    }
                });

                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle(`Toutes les commandes du bot`)
                .setDescription(`\*Préfixe du serveur :\* \`${req[0].prefix}\`\n\*Nombre de commandes :\* \`${bot.commands.size}\``)
                .setTimestamp()
                .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
                .addField("Toutes les commandes disponibles.", ("—————————————————————————— \n\n> \`" + commands.map(command => command.name).join("\`.\n> \`") + "\`.\n\n———————————————————————————"))   
                
                commands.forEach((command) => {
                    if (!categories.includes(command.category)) categories.push(command.category)
                });

                message.reply({ embeds: [Embed] })
            }

            if (command) {

                let Embed = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setTitle(`\*Voici les informations sur la commandes\* → \*${command.name}\*`)
                    .setDescription(`\*Nom de la commande :\* \`${message.user ? args._hoistedOptions[0].value : args[0]}\`.\n\*Description de la commande :\* \`${command.description}\`.\n\*Utilisation de la commande :\* \`${message.user ? args._hoistedOptions[0].value : args[0]} ${command.utilisation}\`.\n\*Alias de la commande :\* ${command.alias.filter(a => a !== (message.user ? args._hoistedOptions[0].value : args[0])).map(a => `\`${a}\``).join(" ")}.\n\*Catégorie de la commande :\* \`${command.category}\`.\n\*Permission de la commande :\* \`${new Discord.Permissions(command.permission).toArray(false)}\`.`)
                    .setTimestamp()
                    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

                message.reply({ embeds: [Embed] })
            }
     }}   })
    
