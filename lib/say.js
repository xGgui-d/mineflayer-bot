const { myBot } = require("../bot")

/* 说一次话 */
function saySome() {
    var charr = []
    for (var char of arguments)
        charr.push(char)
    var str = charr.join(' ')
    // 组成数组
    myBot.bot.chat(str)
}

module.exports = { saySome }