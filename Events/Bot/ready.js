const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const SlashCommand = require("../../Structure/SlashCommand")

module.exports = new Event("ready", async (bot, message) => {

  const db = bot.db;

  await SlashCommand(bot);

  let totalUsers = bot.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
  var activities = [ `${bot.guilds.cache.size} serveur`, `${totalUsers} membres` ], i = 0;
  setInterval(() => bot.user.setActivity(`!help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)

  console.log(`
  ╔═════════════════════════════╗
  ║  Connecté sur ${bot.guilds.cache.size} serveur(s)  ║
  ╚═════════════════════════════╝`)

  
  setInterval(async () => {

    db.query(`SELECT * FROM temp`, async (err, req) => {

      if(req.length < 1) return;

      for(let i = 0; i < req.length; i++) {

        if(Date.now() < parseInt(req[i].time)) return;

        if(req[i].sanctionID.startsWith("BAN")) {

          try {

            bot.guilds.cache.get(req[i].guildID).members.unban(req[i].userID)
            db.query(`DELETE FROM temp WHERE sanctionID = '${req[i].sanctionID}'`)

          } catch (err) {}
        }
      }
  })
  }, 1000)

  let EmbedChannelRendezVousVigneron = bot.channels.cache.get("1000044651601985697")
  let EmbedAvantageVigneron = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle("AVANTAGES VIGNERONS")
  .setDescription(`Commencer par le métier de vigneron dans la ville de Loas Santos à de nombreux avantages :\n\n🔹Plus efficace et rentable que les pommes et les oranges\n\n🔹Tu obtiendras ton premier vehicule de fonction\n\n🔹Nous te proposons les plus gros salaires de l'Etat.\n\n🔹Le travail en équipe te rapportera beaucoup plus\n\n🔹Le patron est actif et à disposition avec un <#` + EmbedChannelRendezVousVigneron + `>`)
  let EmbedAvantageVigneron1 = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setDescription(`Si le métier te plaît et que tu continue de t'investir, tu seras promu. Tu auras alors d'autres avantages :\n\n🔹De nouveaux véhicules offerts, plus haut de gamme\n\n🔹De plus gros salaires\n\n🔹Plus d'interaction avec les citoyens avec les commandes`)
  let EmbedAvantageVigneron2 = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle("BONUS")
  .setDescription(`Tu toucheras des récompenses supplémentaires :\n\n🔹Si tu participes aux événements qui ont lieu chaque week end\n\n🔹Si tu es le meilleur employé de la semaine\n\n🔹A chaque fois que tu battras le record de bouteilles vendues en 1 semaine`)
  .setTimestamp()
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
  let ChannelAvantageVigneron = bot.channels.cache.get("999995933414658158")
  try {
      await ChannelAvantageVigneron.bulkDelete(100)
  } catch (err) {}

  ChannelAvantageVigneron.send({embeds: [EmbedAvantageVigneron, EmbedAvantageVigneron1, EmbedAvantageVigneron2]})
  

  let EmbedChannelPreparationCourse = bot.channels.cache.get("1000013006022906018")
  let EmbedChannelCommandes = bot.channels.cache.get("1000013029917859860")
  let EmbedChannelExempleJournalDeCarriere = bot.channels.cache.get("1000014576387104828")
  let EmbedRegleVigneron = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setDescription(`Bonjour Mesdames et Messieurs,\n\nVoici le règlement de notre société Vigneron ainsi que son serveur discord.\n\n**🔷 LES RÈGLES DISCORD : 🔷**\n\n🔸Nom et prénom RP sur le Discord.\n🔸Les channels cités dans ce règlement seront visibles par les <@&999449823352733706> uniquement.\n\n**🔷 LES RÈGLES A LOS SANTOS : 🔷**\n\n🔶__CHARTE DU VIGNERON :__\n\n🔹Tous vignerons se doivent de **respecter** leur collègue. Une bonne entente ne fera que mieux marcher le métier, et diffusera une très bonne image de celle ci sur la ville.\n🔹Nous sommes avant tout des commerçants. **Le respect**, nous le devons aussi et surtout à chacun des citoyens de Los Santos : c'est PRIMORDIAL.\n\n🔶__REGLES DE BASE :__\n\n~~🔹Lorsque vous êtes en service, vous devez **porter une tenue de travail adaptée**.~~\n🔹Lorsque vous travaillez dans les vignes, ou que vous effectuez une livraison, vous devez **vous déplacer dans un véhicule de fonction** adapté.\n🔹On appelle le client "moldu" à qui nous vendons : **le particulier**\n🔹Il vous est demandé de **vendre au moins 200 bouteilles de vin** au particulier chaque semaine. Si vous n'y parvenez pas 2 semaines consécutives, vous serez rétrogradé/licencié.\🔹Le vol de raisin et de vin est strictement prohibé. Le ou la coupable se verra lourdement sanctionnée.\n\n <#` + EmbedChannelPreparationCourse + `> sert à demander de l'aide aux autres vignerons pour une commande à effectuer par exemple. C'est aussi un lieu de négociation des parts de chacun dans une équipe.\n\n🔶__COMMANDES :__\n\n🔹Vous pouvez effectuer des commandes et non vendre des bouteilles de vin au particulier pour éviter d'être rétrogradé/licencié comme cité plus haut.\n🔹Le reste des règles en lien avec les commandes se trouve dans <#` + EmbedChannelCommandes + `>\n\n🔶__COMMENT TENIR SON JOURNAL DE CARRIERE :__\n\n🔹Pour valider une course, il faut envoyer dans son journal de carrière **deux photos**, prises sur **le lieu du point de vente** des bouteilles.\n\n*Sur la première doit apparaître **le portable, le véhicule de travail utilisé**, ainsi que **le sac ouvert prouvant le nombre de bouteilles** qui vont être vendues*\n\n*(la vente s'effectue à la suite de cette première photo)*\n\n*Sur la deuxième doit apparaître **le portable**, ainsi que **le sac ouvert prouvant que les bouteilles de vin ont été vendues. Il doit donc en rester aucune.***\n\n🔹Se référer au journal <#` + EmbedChannelExempleJournalDeCarriere + `> comme exemple
  
  🔶__VEHICULE DE FONCTION :__

  🔹Le camion n'est pas un véhicule tout terrain, il est interdit dans les vignes
  🔹Vos véhicules perso qui ne sont pas offroad et suv sont interdits dans les vignes

  🔶__GRANDS CRUS/JUS DE RAISIN :__

  🔹A la fin de la semaine, il vous sera demandé de **transférer** les grands cru que vous aurez traité **dans le dépôt** de l'entreprise. Il vous est donc demandé de **les conserver sur vous d'ici la**.
  🔹Vous pouvez **vous servir en grand cru et en jus de raisin uniquement en cas de commande**. Pour ces produits, ce qui à été déposé dans le dépôt appartient à l'entreprise.`)
  .setTimestamp()
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  let EmbedRegleVigneron1 = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle('**ATTENTION**')
  .setDescription(`⚠️⚠️ Ce règlement n'as pas pour but de freiner votre motivation au travail, mais favoriser un RP plus agréable et plus cohérent pour tous, ainsi que prévenir et parer certaines fraudes que les employés pourraient effectuer. 
  Aussi, si vous ne vous sentez pas capable d'envisager ces règles de bonne conduite, veuillez s'il vous plaît éviter de postuler.
  Autrement, de lourdes sanctions seront attribuées.`)
  .setTimestamp()
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
  let ChannelRegleVigneron = bot.channels.cache.get("999997732070625361")
  try {
      await ChannelRegleVigneron.bulkDelete(100)
  } catch (err) {}

  ChannelRegleVigneron.send({embeds: [EmbedRegleVigneron, EmbedRegleVigneron1], content: `@everyone`})


  let EmbedChannelDiscussionRP = bot.channels.cache.get("1000031149860585593")
  let EmbedBoutiqueVigneron = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle("NOTRE BOUTIQUE")
  .setDescription(`🔷 Voici nos différents produits en vente🍇, leurs effets🍷, et leur prix💰\n\n-------------------------\n🍇  Vin\n🍷  Etat d'ébriété de 4 minutes 30 secondes\n💰  80$\n-------------------------\n🍇 Jus de raisin\n🍷  Restaure petite quantité de faim + soif\n💰  20$\n-------------------------\n🍇  Grand cru💎\n🍷  Etat d'ébriété de 9 minutes\n💰  200$\n-------------------------\n\n🔷 Passez une commande en nous téléphonant en ville ou dans <#` + EmbedChannelDiscussionRP + `>`)
  
  let ChannelBoutiqueVigneron = bot.channels.cache.get("1000030757349240922")
  try {
      await ChannelBoutiqueVigneron.bulkDelete(100)
  } catch (err) {}

  ChannelBoutiqueVigneron.send({embeds: [EmbedBoutiqueVigneron]})

  
  let ChannelTicketVigneron1 = bot.channels.cache.get("997305899297292378")
  let EmbedInfoRecrutementVigneron = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle("AVANT DE POSTULER")
  .setDescription(`Veuillez s'il vous plaît prendre connaissance de l'entièreté des <#` + ChannelRegleVigneron + `>. Celles ci servent à vous sensibiliser au fonctionnement du métier vigneron dans *AelistRP*, ainsi qu'à certaines valeurs et à la bonne conduite à adopter.\nAussi, si vous ne vous sentez pas capable d'envisager ces règles, veuillez s'il vous plaît éviter de postuler. Nous ne prendrons pas à la légère les sanctions, ne pensez pas que nous fermerons les yeux sur vos actes.`)
  let EmbedInfoRecrutementVigneron1 = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle("CONDITION POUR POSTULER")
  .setDescription(`🔹Mettre votre NOM et PRENOM RP sur ce serveur\n🔹Détention obligatoire d'un téléphone portable\n\nVous devez ensuite créer un <#` + ChannelTicketVigneron1 + `> et poster votre CV dans le ticket.\nNous attendons un lien vers un Google Doc, sachant que vous avez le minimum que nous attendons de vous dans le formulaire ci-dessous.\n\nSi vous souhaitez utiliser notre formulaire :\n||1. Cliquer sur le lien GoogleDocs ci-dessous.\n2. Copiez l'intégralité du formulaire (vous ne pourrez pas écrire directement dessus).\n3. Cliquez sur "fichier" puis "Nouveau document".\n4. Collez le formulaire sur la page vierge.\n5. Complétez-le.\n6. Mettez votre nom et prénom RP à la place de "document sans titre" en haut à gauche.\n 7.Copiez le lien de la barre de recherche.\n 8.Envoyez le dans le <#` + ChannelTicketVigneron1 + `> que vous avez créer.||\n\nNous vous dirons alors si vous êtes éligibles ou non pour un entretien oral dans votre ticket\n\nEn cas de refus, vous pouvez repostuler un peu plus tard.\n\nSi vous avez le rôle <@&999449823352733706> vous pouvez faire des propositions de <#` + EmbedChannelRendezVousVigneron + `> si vous n'en avez pas encore.\n\nExemple CV :\nhttps://docs.google.com/document/d/1toj9lheH6K7Splwqj8NJ7Uk23HGhNqW_itl-gu51QRo/edit?usp=sharing `)
  
  let ChannelInfoRecrutementVigneron = bot.channels.cache.get("1000032289608179803")
  try {
      await ChannelInfoRecrutementVigneron.bulkDelete(100)
  } catch (err) {}

  ChannelInfoRecrutementVigneron.send({embeds: [EmbedInfoRecrutementVigneron, EmbedInfoRecrutementVigneron1], content: `@everyone`})

  let ChannelDemandeDeRoleVigneron = bot.channels.cache.get("1000046363519758366")
  let EmbedParticipationEventVigneron = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle("PARTICIPER AUX EVENTS")
  .setDescription(`🔶Pour participer aux événements, vous devez avoir un rôle <@&999449823352733706>.\n\n🔹Cela veut dire que vous devez faire partie d'une des entreprises, ou l'un des groupes avec lequel les vignerons sont partenaires, ou que vous êtes vigneron.\n🔹Après avoir mis vos Nom et Prénom RP sur le serveur, vous pouvez demandez un rôle dans <#` + ChannelDemandeDeRoleVigneron + `>.`)
  .setTimestamp()
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
  let ChannelParticipationEventVigneron = bot.channels.cache.get("1000042984965939271")
  try {
      await ChannelParticipationEventVigneron.bulkDelete(100)
  } catch (err) {}

  ChannelParticipationEventVigneron.send({embeds: [EmbedParticipationEventVigneron]})

  
  let EmbedTicket = new Discord.MessageEmbed()
  .setColor(bot.color)
  .setTitle('Création ticket')
  .setDescription(`*Il y a plusieurs conditions à respecter dans le salon où sera créé votre ticket :*\n*- \_\_Pas de mentions\_\_ sauf si vous n'avez \_\_pas reçu de réponse sous 24h\_\_.*\n*- \_\_Pas de spam\_\_.*\n*- Ne pas créer de ticket pour des trucs qui ne servent a rien.*`)
  .setTimestamp()
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
  var MenuTicket = new Discord.MessageActionRow()
  .addComponents(new Discord.MessageSelectMenu()
  .setCustomId('menuticket')
  .setMaxValues(1)
  .setMinValues(0)
  .setPlaceholder('Sélectionner le type de ticket que vous voulez !')
  .addOptions([
    {
      label: "Dépôt CV", 
      description: "Ouvre un ticket pour déposer ton CV",  
      emoji: "📩", 
      value: "depotcv"
    },
    {
      label: "Créer ton emploi", 
      description: "Ouvre un ticket pour créer ton emploi",  
      emoji: "💼", 
      value: "emploi"
    }
    ])
  );
  
  let ChannelTicketVigneron = bot.channels.cache.get("997305899297292378")
  try {
      await ChannelTicketVigneron.bulkDelete(100)
  } catch (err) {}

  ChannelTicketVigneron.send({embeds: [EmbedTicket], components: [MenuTicket]})
})