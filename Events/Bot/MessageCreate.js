const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("messageCreate", async (bot,message) => {

  if(message.author.bot) return;
  
  const db = bot.db;

  db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {

    if(req.length < 1) {

      let sql = `INSERT INTO serveur (guildID, prefix, raid, captcha) VALUES (${message.guild.id}, '/', 'off', 'off')`
      db.query(sql, function(err) {
        if(err) throw err;
      })

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`⚙️ \*Attendez que le bot enregistre votre serveur !\*`)

      return message.reply({embeds: [Embed1]})
    }

    let prefix = req[0].prefix

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandFile = bot.alias.get(command.slice(prefix.length))

    await bot.function.searchLinks(message)
    await bot.function.searchMentions(message)
    await bot.function.searchSpam(message)

    db.query(`SELECT * FROM user WHERE userID = ${message.author.id}`, async (err, req) => {

      if(req.length < 1) {

          let sql = `INSERT INTO user (userID, xp, level) VALUES (${message.author.id}, '0', '0')`
          db.query(sql, function(err) {
              if(err) throw err;
          })

      } else {

          if(!message.content.startsWith(prefix)) {

              let xp = Math.floor(Math.random() * 24) + 1;
              let need = (parseInt(req[0].level) + 1) * 1000;

              db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) + xp}' WHERE userID = ${message.author.id}`)

              if(parseInt(req[0].xp) >= need) {

                  db.query(`UPDATE user SET level = '${parseInt(req[0].level) + 1}' WHERE userID = ${message.author.id}`)
                  db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)

                  let Embed2 = new Discord.MessageEmbed()
                  .setColor(bot.color)
                  .setDescription(`\*Bravo ${message.author}, tu es passé niveau\* \`${parseInt(req[0].level) + 1}\` \*!\*`)
                  
                  message.channel.send({embeds: [Embed2]})
              }

              if(parseInt(req[0].xp) < 0) {

                  db.query(`UPDATE user SET level = '${parseInt(req[0].level) - 1}' WHERE userID = ${message.author.id}`)
                  db.query(`UPDATE user SET xp = '${(parseInt(req[0].level) * 1000) + parseInt(req[0].xp)}' WHERE userID = ${message.author.id}`)

                  let Embed3 = new Discord.MessageEmbed()
                  .setColor(bot.color)
                  .setDescription(`\*Dommage ${message.author}, tu es redescendu niveau\* \`${parseInt(req[0].level) - 1}\`.`)

                  message.channel.send({embeds: [Embed3]})
              }
          }
      }
  })
  
    let Embed4 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Cette commande n'existe pas !\*`)

    if(!message.content.startsWith(prefix)) return;
    if(!commandFile) return message.reply({embeds: [Embed4]})

    let Embed5 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous n'avez pas la permission requise pour exécuter cette commande !\*`)

    let Embed6 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous n'avez pas la permission requise pour exécuter cette commande !\*`)

    if(commandFile.permission === "Développeur" && message.author.id !== "940232076626640897") return message.reply({embeds: [Embed5]})
    if(commandFile.permission !== "Aucune" && commandFile.permission !== "Développeur" && !message.member.permissions.has(new Discord.Permissions(commandFile.permission))) return message.reply({embeds: [Embed6]})
  
    commandFile.run(bot, message, args, db)
  

  // REPONSE POLITESSE MESSAGE
  if(message.content === "Salut") return await message.reply("*Salut 👋*")
  if(message.content === "salut") return await message.reply("*Salut 👋*")
  if(message.content === "Slt") return await message.reply("*Salut 👋*")
  if(message.content === "slt") return await message.reply("*Salut 👋*")
  if(message.content === "Bonjour") return await message.reply("*Salut 👋*")
  if(message.content === "bonjour") return await message.reply("*Salut 👋*")
  if(message.content === "Bjr") return await message.reply("*Salut 👋*")
  if(message.content === "bjr") return await message.reply("*Salut 👋*")
  if(message.content === "Bonsoir") return await message.reply("*Salut 👋*")
  if(message.content === "bonsoir") return await message.reply("*Salut 👋*")
  if(message.content === "Bsr") return await message.reply("*Salut 👋*")
  if(message.content === "bsr") return await message.reply("*Salut 👋*")
  if(message.content === "Wesh") return await message.reply("*Salut 👋*")
  if(message.content === "wesh") return await message.reply("*Salut 👋*")
  if(message.content === "Wsh") return await message.reply("*Salut 👋*")
  if(message.content === "wsh") return await message.reply("*Salut 👋*")
  if(message.content === "çv ?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "çv?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "çv") return await message.reply("*Trkl et toi ?*")
  if(message.content === "Cv?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "Cv ?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "Cv") return await message.reply("*Trkl et toi ?*")
  if(message.content === "cv?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "cv ?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "cv") return await message.reply("*Trkl et toi ?*")
  if(message.content === "ça va?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "ça va ?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "ça va") return await message.reply("*Trkl et toi ?*")
  if(message.content === "çava ?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "çava?") return await message.reply("*Trkl et toi ?*")
  if(message.content === "çava") return await message.reply("*Trkl et toi ?*")
  if(message.content === "Tfk ?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tfk?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tfk") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tfk ?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tfk?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tfk") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tfq ?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tfq?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tfq") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tfq ?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tfq?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tfq") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tu fais quoi ?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tu fais quoi?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tu fais quoi ?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tu fais quoi?") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "Tu fais quoi") return await message.reply("*Je modere ça se voit nan ?*")
  if(message.content === "tu fais quoi") return await message.reply("*Je modere ça se voit nan ?*")
  

  // REPONSE INSULTE MESSAGE
  if(message.content === "Tg") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "tg") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "TG") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Ta gueule") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "ta gueule") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "TA GUEULE") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Ftg") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "ftg") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "FTG") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Ferme ta gueule") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "ferme ta gueule") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "FERME TA GUEULE") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Ntm") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "ntm") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "NTM") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Nique ta mere") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Nique ta mère") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "nique ta mère") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "nique ta mere") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "NIQUE TA MERE") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "fdp") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Fdp") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "FDP") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "Fils de pute") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "fils de pute") return await message.reply("*PAS D'INSULTES !*")
  if(message.content === "FILS DE PUTE") return await message.reply("*PAS D'INSULTES !*")
})})