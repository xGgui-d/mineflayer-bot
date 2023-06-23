/* 传送到某岛 */
function tpWhere(myBot, where) {
    myBot.bot.chat(`/visit ${where}`)
}
/* 传送到某人所在岛 */
function tpaWho(myBot, who) {
    myBot.bot.chat(`/is tp ${who}`)
}

module.exports = { tpWhere, tpaWho }