const Client = require("./Structure/Client")
const bot = new Client();

bot.start(process.env.TOKEN)
