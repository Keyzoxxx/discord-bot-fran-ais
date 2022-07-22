const Discord = require("discord.js")
const Event = require("../../Structure/InviteEvent")

module.exports = new Event("guildMemberRemove", async (bot, member) => {

    let channel = bot.channels.cache.get("988489372213067796")

    let totalUsers = bot.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)

    const Goodbye = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setTitle('OH ! Un nouveau départ !')
    .setDescription(`*A bientôt* ${member.user} *!*\n\n*Nous sommes maintenant* ${totalUsers} *sur le serveur !*`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

    await channel.send({embeds: [Goodbye]})
})