const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("guildBanAdd", async (bot, ban) => {

    const fetchAuditLogs = await ban.guild.fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
        limit: 1
    })

    const LatestBan = fetchAuditLogs.entries.first()

    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Utilisateur banni")
    .setThumbnail('https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F729737792480870431.png%3Fv%3D1&w=64&q=75')
    .setDescription(`\*\*Banni :\*\* \*${ban.user} (${ban.user.tag})\*\n\*\*Auteur :\*\* \*${LatestBan.executor} (${LatestBan.executor.tag})\*\n\*\*Raison :\*\* \*${ban.reason ? ban.reason : "Aucun raison donnée"}\*`)

    await bot.channels.cache.get("999445891024945242").send({embeds: [Embed]})
})