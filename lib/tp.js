function tpWhere(myBot, where) {
    myBot.bot.chat(`/visit ${where}`)
}
function tpaWho(myBot, who) {
    myBot.bot.chat(`/is tp ${who}`)
}

module.exports = { tpWhere, tpaWho }