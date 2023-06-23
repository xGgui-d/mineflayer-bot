// ========================
// 烤土豆组合功能
// ========================

//记录当前坐上的矿车
let minecart = null
//定时器
let timer_01 = null // 定时右键营火
let timer_02 = null // 定时丢弃骨粉

/* 开始烤土豆 */
async function startCampfirePotato(myBot) {
    //坐上矿车
    sitOnMinecart(myBot)
    timer_01 = setInterval(() => {


        //装备土豆
        let items = myBot.bot.inventory.findInventoryItem(myBot.bot.registry.itemsByName.potato.id)
        //身上没有土豆
        if (Tool.emptyJudge.isEmpty(items)) {
            Tool.msgFormat.logMsg(myBot, `身上没有土豆了，从云仓获取`)
            myBot.bot.chat('/ci get potato 512')
            return
        }
        
        //当背包不足5格时，自动丢弃除土豆之外的物品
        if (myBot.bot.inventory.emptySlotCount() === 0) {
            tossOther(myBot)
        }

        myBot.bot.equip(items, "hand")
        actCampfire(myBot)
    }, 100)

}

/* 停止烤土豆 */
function stopCampfirePotato() {
    //清除计时器
    clearInterval(timer_01)
    minecart = null
}

/* 从背包中筛选出要扔的物品 */
function tossItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName)
}

/* 开始定时丢骨粉(使用前先设置自动合成骨粉) */
async function startTossBoneMeal(myBot) {
    timer_02 = setInterval(() => {
        Lib.cloudInv.withdraw(myBot,'bone_meal',1728);
        Lib.toss.toss(myBot,'bone_meal',1728);
    }, 10000)  //10s

}
/* 停止定时丢骨粉 */
async function stopTossBoneMeal() {
    //清除计时器
    clearInterval(timer_02)
}


/* 丢弃不属于土豆的东西 */
async function tossOther(myBot) {
    //先扔掉与itemName不相同的物品
    var toItems = tossItems(myBot, 'potato')
    //console.log(toItems);
    try {
        for (let i = 0; i < toItems.length; i++)
            await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
    } catch (e) {

    }
}

/* 使bot坐上最近的矿车 */
async function sitOnMinecart(myBot) {
    try {
        minecartFilter = entity => entity.name.toLowerCase() === 'minecart'
        minecart = myBot.bot.nearestEntity(minecartFilter)
        if (!minecart) {
            Tool.msgFormat.logMsg(myBot, '找不到矿车')
            return
        }
        await myBot.bot.activateEntity(minecart)
    } catch (e) {
        console.log(e)
    }
}

/* 执行一次烤土豆 */
async function actCampfire(myBot) {
    //查找一个营火
    try {
        Lib.activateBlock.actBlock(myBot, 'campfire', minecart.position)
    } catch (e) {
        Tool.msgFormat.logMsg(myBot, '没有找到营火')
        stopCampfirePotato(myBot)
    }

}

module.exports = { startCampfirePotato, stopCampfirePotato,
     startTossBoneMeal, stopTossBoneMeal }