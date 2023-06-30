const { myBot } = require("../bot")


/* 丢弃所有物品 */
async function tossAll() {

    var toItems = myBot.bot.inventory.items()
    try {
        for (let i = 0; i < toItems.length; i++)
            await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
    } catch (e) { console.error(e) }

}

/* 丢弃一件物品 */
async function toss(itemName, count) {

    var toItem = myBot.bot.inventory.items().filter((item) => item.name === itemName)
    try {
        await myBot.bot.toss(toItem[0].type, toItem[0].metadata, count)
    } catch (e) { Tool.msgFormat.errMsg('背包里没有该物品') }

}

module.exports = { tossAll, toss }

