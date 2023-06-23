
//从背包中筛选出要上传的物品
function getItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name === itemName)
}
//从背包中筛选出要扔的物品
function tossItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName)
}

async function inputItem(myBot, itemName, window) {

    //先扔掉与itemName不相同的物品
    var toItems = tossItems(myBot, itemName)
    try {
        for (let i = 0; i < toItems.length; i++)
            await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
    } catch (e) { }

    //获取与itemName相同的物品
    let item = getItems(myBot, itemName)[0]

    if (Tool.emptyJudge.isEmpty(item)) {
        Tool.msgFormat.logMsg(myBot, '没有物品可以存入')
        return
    }
    Tool.msgFormat.logMsg(myBot, `将物品存入云仓，物品槽[${myBot.bot.inventory.emptySlotCount()}]`)
    try {

        await myBot.bot.transfer({
            window: window,
            itemType: item.type,
            metadata: item.metadata,
            sourceStart: 53,
            sourceEnd: 89,
            destStart: 0,
            destEnd: 52,
            count: 1728
        });

    } catch (e) {
        //数量不足1728报的错
        //console.log(e)
    }
}

// 建立云仓窗口的监听
async function deposit(myBot) {
    myBot.bot.chat('/ci put')
}
//存入一次云仓
async function setup_deposit(myBot, itemName) {

    //建立监听窗口
    myBot.bot.on('windowOpen', async (window) => {
        // console.log('window open' + num)
        let title = window.title;
        try {
            if (title === "{\"text\":\"上传物品\"}") {
                await inputItem(myBot, itemName, window)
            }
        } finally {
            //延迟一段时间在关闭
            setTimeout(() => {
                // console.log('window close')
                window.close();
            }, "1000")
            //取消监听
            myBot.bot.removeListener('windowOpen', async (window) => {
                console.log('removelistenrer')
            })
        }
    })
    // 打开窗口
    deposit(myBot)
}


//取出一次云仓
function withdraw(myBot, itemName, count) {
    Tool.msgFormat.logMsg(myBot, '将物品从云仓取出')
    myBot.bot.chat(`/ci get ${itemName} ${count}`)
}

module.exports = { deposit, withdraw, setup_deposit }