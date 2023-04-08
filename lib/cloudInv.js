//从背包中筛选出要上传的物品
function getItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name === itemName)
}
//从背包中筛选出要扔的物品
function tossItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName)
}

//存入云仓
async function deposit(myBot, window) {
    try {

        if (window.title !== "{\"text\":\"上传物品\"}") {
            return
        }
        //先扔掉与itemName不相同的物品
        var toItems = tossItems(myBot, myBot.ciItemName)
        //console.log(toItems);
        try {
            for (let i = 0; i < toItems.length; i++)
                await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
        } catch (e) { }

        //获取与itemName相同的物品
        let item = getItems(myBot, myBot.ciItemName)[0]
        //console.log(item)
        if (Tool.emptyJudge.isEmpty(item)) {
            Tool.msgFormat.logMsg(myBot, '没有物品可以存入')
            return
        }

        Tool.msgFormat.logMsg(myBot, '将物品存入云仓')
        let type = item.type
        let metadata = item.metadata
        try {

            await myBot.bot.transfer({
                window: window,
                itemType: type,
                metadata: metadata,
                sourceStart: 53,
                sourceEnd: 89,
                destStart: 0,
                destEnd: 52,
                count: 1728
            });

        } catch (e) { }
    } catch (e) {
        //console.log(e)
        //Tool.msgFormat.logMsg(myBot, '出错')
    } finally {
        //console.log('close');
    }

}

function withdraw(myBot, itemName, count) {
    Tool.msgFormat.logMsg(myBot, '将物品从云仓取出')
    myBot.bot.chat(`/ci get ${itemName} ${count}`)
}

module.exports = { deposit, withdraw}