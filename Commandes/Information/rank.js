const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "rank",
    description: "Permet de voir l'expérience d'un utilisateur",
    utilisation: "(membre)",
    alias: ["rank", "level"],
    permission: "Aucune",
    category: "Expérience",

    async run(bot, message, args, db) {

        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : (args._hoistedOptions.length === 0 ? message.user : bot.users.cache.get(args._hoistedOptions[0].value))
        if(!user) user = message.author;
        
        await message.reply(`⚙️ \*En cours...\*`).then(async msg => {
          

            async (err, req) => {

                if(req.length < 1) {
                    try {
                        let Embed1 = new Discord.MessageEmbed()
                        .setColor(bot.color)
                        .setDescription(`❌ \*Cette personne n'est pas enregistrée !\*`)
                      
                        message.editReply({embeds: [Embed1]})
                        return;
                    } catch (err) {
                        let Embed2 = new Discord.MessageEmbed()
                        .setColor(bot.color)
                        .setDescription(`❌ \*Cette personne n'est pas enregistrée !\*`)

                        msg.edit({embeds: [Embed2]})
                        return;
                    }
                }
    
                const calculXp = async (xp, level) => {
    
                    let xptotal = 0;
    
                    for(let i = 0; i < (level + 1); i++) {
    
                        xptotal = xptotal + (i * 1000)
                    }
    
                    xptotal = xptotal + xp
    
                    return xptotal;
                }
    
                db.query(`SELECT * FROM user`, async (err, all) => {
    
                    const leaderboard = all.sort((a, b) => calculXp(b.xp, b.level) - calculXp(a.xp, a.level))
                    const rank = leaderboard.findIndex(u => u.userID === user.id) + 1;
    
                    const Rank = await new Canvas.Card()
                    .setBot(bot)
                    .setBackground("./background.jpg")
                    .setGuild(message.guild)
                    .setUser(user)
                    .setXp(parseInt(req[0].xp))
                    .setXpNeed((parseInt(req[0].level) + 1) * 1000)
                    .setLevel(parseInt(req[0].level))
                    .setRank(rank)
                    .setColorFont(bot.color)
                    .setColorProgressBar("#cc83ff")
                    .toCard()
    
                    const attachment = new Discord.MessageAttachment(Rank.toBuffer(), 'rank.png')
                    
                    try {
                        msg.edit({content: null, files: [attachment]})
                    } catch (err) {
                        message.editReply({content: null, files: [attachment]})
                    }
                })
       }   })
        }})
  