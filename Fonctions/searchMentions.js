const Discord = require("discord.js");

module.exports = async (message, bot, args, db) => {

  if(message.channel.id === "") return;
  if(message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return;
 
  let content = message.content.split(" ")
  let count = 0;

  for(let i = 0; i < content.length; i++) {

      if(content[i].match(new RegExp(/<@!*&*[0-9]+>/g))) count++;
  }

  if(count > 1) {

      await message.delete()

      let Embed = new Discord.MessageEmbed()
      .setColor('#00feff')
      .setDescription(`⚠️ \*Attention ${message.author}, vous mentionnez trop de fois dans un seul message !\*`)

      await message.channel.send({embeds: [Embed]})
  }
}