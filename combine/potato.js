/**
*烤土豆组合功能
**/

//记录当前坐上的矿车
let minecart = null
//定时器
let timer = null

//开始烤土豆
async function startCampfirePotato(myBot) {
    myBot.botState.isPotato = true
    //坐上矿车
    if(!sitOnMinecart(myBot)) return
    timer = setInterval(() => {


        //装备土豆
        const items = myBot.bot.inventory.findInventoryItem(myBot.bot.registry.itemsByName.potato.id)
        //身上没有土豆
        if (Tool.emptyJudge.isEmpty(items)) {
            Tool.msgFormat.logMsg(myBot, `身上没有土豆了`)
            //停止烤土豆
            stopCampfirePotato(myBot)
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

//停止烤土豆
function stopCampfirePotato(myBot) {
    myBot.botState.isPotato = false
    //清除计时器
    clearInterval(timer)
    minecart = null
}

//从背包中筛选出要扔的物品
function tossItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName)
}

//丢弃不属于土豆的东西
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

//使bot坐上最近的矿车
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

    }
}

//执行一次烤土豆
async function actCampfire(myBot) {
    const mcData = require('minecraft-data')(myBot.bot.version);
    //查找一个营火
    try {
        let targetBlock = myBot.bot.findBlock({
            point: minecart.position,//以矿车作为原点
            matching: mcData.blocksByName['campfire'].id,
            maxDistance: 5//32格范围之内
        })
        await myBot.bot.activateBlock(targetBlock)

    } catch (e) {
        Tool.msgFormat.logMsg(myBot, '没有找到营火')
        stopCampfirePotato(myBot)
    }


}

module.exports = { startCampfirePotato, stopCampfirePotato }