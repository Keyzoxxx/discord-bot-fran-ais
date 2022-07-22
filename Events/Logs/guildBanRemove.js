const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("guildBanRemove", async (bot, ban) => {

    const fetchAuditLogs = await ban.guild.fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
        limit: 1
    })

    const LatestUnban = fetchAuditLogs.entries.first()

    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Utilisateur débanni")
    .setThumbnail('https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F720066174075011154.png%3Fv%3D1&w=64&q=75')
    .setDescription(`\*\*Débanni :\*\* \*${ban.user} (${ban.user.tag})\*\n\*\*Auteur :\*\* \*${LatestUnban.executor} (${LatestUnban.executor.tag})\*\n\*\*Raison :\*\* \*${ban.reason ? ban.reason : "Aucun raison donnée"}\*`)

    await bot.channels.cache.get("999445891024945242").send({embeds: [Embed]})
})