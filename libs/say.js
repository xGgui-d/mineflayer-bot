const { myBot } = require("../bot")

/* 说一次话 */
function saySome(str) {
    console.log('str: '+str)
    myBot.bot.chat(str)
}

module.exports = { saySome }