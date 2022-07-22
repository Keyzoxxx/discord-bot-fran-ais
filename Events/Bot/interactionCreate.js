const Discord = require("discord.js")
const Event = require("../../Structure/Event");

module.exports = new Event("interactionCreate", async (bot, interaction) => {

  if(interaction.isCommand()) {

    const command = bot.commands.get(interaction.commandName)

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous n'avez pas la permission requise pour exécuter cette commande !\*`)

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`❌ \*Vous n'avez pas la permission requise pour exécuter cette commande !\*`)
    
    if(command.permission === "Développeur" && interaction.user.id !== "940232076626640897") return interaction.reply({embeds: [Embed1]})
    if(command.permission !== "Aucune" && command.permission !== "Développeur" && !interaction.member.permissions.has(new Discord.Permissions(command.permission))) return interaction.reply({embeds: [Embed2]})

    command.run(bot, interaction, interaction.options, bot.db)
  }
 
  if(interaction.isButton()) {
    if(interaction.customId === "valided") {
      await interaction.member.roles.add('999449823352733706')
    }
    else if(interaction.customId === "closeticket") {
      interaction.channel.delete();
    }
  }

  if(interaction.isSelectMenu()) {
    if(interaction.customId === 'menuticket') {
      if(interaction.values == 'depotcv') {
        let channel = await interaction.guild.channels.create(`CV-${interaction.user.username}`, {type: "GUILD_TEXT"})
            await channel.setParent('1000023823103578122')

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

          let EmbedOpen = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription(`✅ \*Votre ticket a été créé avec succès ${channel} !\*`)
          
          let EmbedEnvoyer = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle('Ticket ouvert')
          .setDescription("Voici votre ticket.\nVeuillez déposer votre CV ici !")
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
          var Button = new Discord.MessageActionRow()
          .addComponents(new Discord.MessageButton()
          .setCustomId('closeticket')
          .setLabel("Fermer le ticket")
          .setStyle('DANGER')
          .setEmoji('🔒')
          );
          channel.send({content: "<@" + interaction.user.id + ">", embeds: [EmbedEnvoyer], components: [Button]})

        interaction.reply({embeds: [EmbedOpen], ephemeral: true})
      }
      else if(interaction.values == 'emploi') {
        let channel = await interaction.guild.channels.create(`Journal-de-${interaction.user.username}`, {type: "GUILD_TEXT"})
            await channel.setParent('999362644748292117')

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

          let EmbedOpen = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription(`✅ \*Votre ticket a été créé avec succès ${channel} !\*`)
          
          let EmbedEnvoyer = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle('Ticket ouvert')
          .setDescription("🍷 Voici ton journal de carrière 🍷\nSi tu souhaite démissionner, merci de prévenir le patron afin qu'il puisse fermer ton journal de carrière !")
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
          var Button = new Discord.MessageActionRow()
          .addComponents(new Discord.MessageButton()
          .setCustomId('closeticket')
          .setLabel("Démissionner")
          .setStyle('DANGER')
          .setEmoji('🔒')
          );
          channel.send({content: "<@" + interaction.user.id + ">", embeds: [EmbedEnvoyer], components: [Button]})

        interaction.reply({embeds: [EmbedOpen], ephemeral: true})
      }
    }
  }
})
