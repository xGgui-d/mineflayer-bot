function saySome(myBot, str) {
    console.log('str: '+str)
    myBot.bot.chat(str)
}

module.exports = { saySome }