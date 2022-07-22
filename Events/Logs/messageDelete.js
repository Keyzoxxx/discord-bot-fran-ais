const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("messageDelete", async (bot, message) => {

    if(bot.snipe.get(message.channel.id)) await bot.snipe.delete(message.channel.id) && await bot.snipe.set(message.channel.id, message)
    else await bot.snipe.set(message.channel.id, message);
    
    if(message.author.bot) return;

    const AuditsLogs = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE',
        limit: 1
    })

    const LatestMessageDeleted = AuditsLogs.entries.first();
    
    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Message supprimé")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setDescription(`***Auteur du message :*** *${message.author}*\n***Auteur de la suppresion :*** *${LatestMessageDeleted.executor}*\n***Date de création du message :*** *<t:${Math.floor(message.createdAt / 1000)}:F>*\n***Contenu :*** \`\`\`${message.content}\`\`\``)

    await bot.channels.cache.get("999445583154647121").send({embeds: [Embed]})
})