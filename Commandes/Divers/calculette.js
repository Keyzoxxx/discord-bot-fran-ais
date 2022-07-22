const Discord = require("discord.js");
const simplydjs = require("simply-djs");
const Command = require("../../Structure/Command")

module.exports = new Command ({
    run: async(bot, message, args) => {
        simplydjs.calculator(message, {
          embedColor: '#00feff',
        })
    },
    name: "calculette",
    description: "Permet de faire des calcules",
    utilisation: "",
    alias: ["calculette", "calcul", "c"],
    permission: "Aucune",
    category: "Divers",
});