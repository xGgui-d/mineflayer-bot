const { myBot } = require("../bot")


/* 传送到某岛 */
function tpWhere(where) {
    myBot.bot.chat(`/visit ${where}`)
}

/* 传送到某人所在岛 */
function tpaWho(who) {
    myBot.bot.chat(`/is tp ${who}`)
}

module.exports = { tpWhere, tpaWho }