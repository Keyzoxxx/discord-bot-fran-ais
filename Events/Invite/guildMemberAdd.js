const Discord = require("discord.js")
const InviteEvent = require("../../Structure/InviteEvent")

module.exports = new InviteEvent("guildMemberAdd", async (bot, member, type, invite, message) => {

    let channel = bot.channels.cache.get("940248731939393596")

    let ChannelBoutiqueVigneron = bot.channels.cache.get("1000030757349240922")
    let ChannelInfoRecrutementVigneron = bot.channels.cache.get("1000032289608179803")
    let ChannelRegleVigneron = bot.channels.cache.get("999997732070625361")
    let EmbedChannelDiscussionRP = bot.channels.cache.get("1000031149860585593")
    let EmbedChannelParticipationEvent = bot.channels.cache.get("1000042984965939271")
    const Welcome = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setTitle('OH ! Un nouveau arrivant !')
    .setDescription(`Si tu es intéressé par le recrutement\n↳ <#` + ChannelInfoRecrutementVigneron + `>\n\nMais avant tout, voilà comment fonctionne le métier à Los Santos\n↳ <#` + ChannelRegleVigneron + `>\n\nLa liste de nos produits\n↳ <#` + ChannelBoutiqueVigneron + `>\n\nSi tu veux passer une commande\n↳ <#` + EmbedChannelDiscussionRP + `>\n\nSi tu veux participer aux événements\n↳ <#` + EmbedChannelParticipationEvent + `>\n\n🍷 Bon jeu à toi !🍷`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

    await channel.send({content: `${member.user}`,embeds: [Welcome]})
})