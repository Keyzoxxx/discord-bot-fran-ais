const Discord = require("discord.js");

module.exports = async (message, bot, args) => {
  
  if(message.channel.id === "") return;
  if(message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return;
  if(message.content.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g))) { 
  
      await message.delete() 

      let Embed = new Discord.MessageEmbed()
      .setColor('#00feff')
      .setDescription(`⚠️ \*Attention ${message.author}, les liens ne sont pas acceptés dans ce salon !\*`)

      await message.channel.send({embeds: [Embed]})
  }
}