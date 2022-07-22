const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("messageUpdate", async (bot, oldMessage, newMessage) => {

    if(oldMessage.author.bot) return;
    
    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Message modifié")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setDescription(`\*Auteur du message :\* ${oldMessage.author}\n\*Date de création du message : <t:${Math.floor(oldMessage.createdAt / 1000)}:F>\*\n\*Ancien contenu :\* \`\`\`${oldMessage.content}\`\`\`\*Nouveau contenu :\* \`\`\`${newMessage.content}\`\`\``)

    await bot.channels.cache.get("999445740554305576").send({embeds: [Embed]})
})