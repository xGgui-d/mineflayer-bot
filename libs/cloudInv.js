const { myBot } = require("../bot")

/* 云仓的存储操作 */


let mode = true // mode=true 存入前先丢弃其他物品，mode=false 存入前不丢弃其他物品
let itemName = null // 当前要存入云端的物品

/* 从背包中筛选出要上传的物品 */
function getItems() {
    return myBot.bot.inventory.items().filter((item) => item.name === itemName)
}
/* 从背包中筛选出要扔的物品 */
function tossItems() {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName)
}

/* 将物品放入窗口 */
async function inputItem(window) {
    if (mode) {
        //先扔掉与itemName不相同的物品
        var toItems = tossItems()
        try {
            for (let i = 0; i < toItems.length; i++)
                await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
        } catch (e) { }
    }

    //获取与itemName相同的物品
    let item = getItems()[0]

    if (Tool.emptyJudge.isEmpty(item)) {
        Tool.msgFormat.logMsg('没有物品可以存入')
        return
    }
    Tool.msgFormat.logMsg(`将物品存入云仓，物品槽[${myBot.bot.inventory.emptySlotCount()}]`)
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


/* 存入一次云仓 */
async function deposit(m_itemName, m_mode) {
    mode = m_mode
    itemName = m_itemName
    if (!myBot.botListener['windowOpen']) {
        setup_deposit()
        //建立监听，只建立一次
        myBot.botListener['windowOpen'] = true
    }
    myBot.bot.chat('/ci put')
}

/* 建立云仓窗口的监听 */
async function setup_deposit() {

    //建立监听窗口
    myBot.bot.on('windowOpen', async (window) => {
        let title = window.title;
        try {
            if (title === "{\"text\":\"上传物品\"}") {
                await inputItem(window)
            }
        } finally {
            //延迟一段时间在关闭
            setTimeout(() => {
                window.close();
            }, "1000")
            //取消监听
            myBot.bot.removeListener('windowOpen', async (window) => {
                console.log('removelistenrer')
            })
        }
    })

}


/* 取出一次云仓 */
function withdraw(itemName, count) {
    Tool.msgFormat.logMsg('将物品从云仓取出')
    myBot.bot.chat(`/ci get ${itemName} ${count}`)
}

module.exports = { deposit, withdraw, setup_deposit }