const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "clearchannel",
    description: "Permet de supprimer tous les messages d'un salon",
    utilisation: "",
    alias: ["clearchannel", "clearsalon", "clearall"],
    permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
    category: "Modération",

    async run(bot, message, args, db) {

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`❌ \*Impossible de clear ce salon !\*`)

      if(!message.channel.deletable) return message.reply({embeds: [Embed1]})
          message.channel.clone().then((ch) => {
              let Embed2 = new Discord.MessageEmbed()
              .setColor(bot.color)
              .setDescription("<@" + message.author.id + ">\*, Salon recréé ✅\*")

              ch.setParent(message.channel.parent);
              ch.setPosition(message.channel.position);
              message.channel.delete();
              ch.send({embeds: [Embed2]}).then(msg => {
                  setTimeout(() => {
                      msg.delete();
                  }, 3000)
              })
          })
     }
})