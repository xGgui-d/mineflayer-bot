// ========================
// 烤土豆组合功能
// ========================

const { myBot } = require("../bot")

let minecart = null // 记录当前坐上的矿车
let timer_01 = null // 定时右键营火
let timer_02 = null // 定时丢弃骨粉
let timer_03 = null // 定时存入土豆
let count = 0 // 一天24次1728个骨粉

/* 开始烤土豆 */
async function startCampfirePotato() {
    // 坐上矿车
    sitOnMinecart()
    timer_01 = setInterval(() => {


        // 装备土豆
        let items = myBot.bot.inventory.findInventoryItem(myBot.bot.registry.itemsByName.potato.id)
        // 身上没有土豆
        if (Tool.emptyJudge.isEmpty(items)) {
            Tool.msgFormat.logMsg(`身上没有土豆了，从云仓获取`)
            myBot.bot.chat('/ci get potato 512')
            return
        }

        // 当背包不足5格时，自动丢弃除土豆之外的物品
        if (myBot.bot.inventory.emptySlotCount() === 0) {
            tossOther()
        }

        myBot.bot.equip(items, "hand")
        actCampfire()
    }, 100)

}

/* 停止烤土豆 */
function stopCampfirePotato() {
    // 清除计时器
    clearInterval(timer_01)
    minecart = null
}

/* 开始定时丢骨粉(使用前先手动设置自动合成骨粉) */
async function startTossBoneMeal() {
    // 循环检测当前的游戏时间
    timer_02 = setInterval(() => {
        // 村民 2000 时间开始工作到 9000 （ 一天 0-24000 ） during 350s
        if (myBot.bot.time.timeOfDay > 2000 && myBot.bot.time.timeOfDay < 9000) {
            // 一次性投掷骨粉
            Lib.cloudInv.withdraw('bone_meal', 1728);
            Lib.toss.toss('bone_meal', 1728);
            count++
        } else {
            count = 0
        }
    }, 14000) // 14s 丢一次1728

}
/* 停止定时丢骨粉 */
async function stopTossBoneMeal() {
    //清除计时器
    clearInterval(timer_02)
    count = 0
}

/* 开始把土豆放入云仓 */
async function startCollectPotato() {
    timer_03 = setInterval(() => {
        // 存入毒土豆和土豆
        Lib.cloudInv.deposit('poisonous_potato', false)
        setTimeout(() => {
            Lib.cloudInv.deposit('potato', false)
        }, 1000)
    }, 2000) //最低2000

}

/* 停止把土豆放入云仓 */
function stopCollectPotato() {
    clearInterval(timer_03)
}

/* 从背包中筛选出要扔的物品 */
function tossItems(itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName)
}

/* 丢弃不属于土豆的东西 */
async function tossOther() {
    //先扔掉与itemName不相同的物品
    var toItems = tossItems('potato')
    //console.log(toItems);
    try {
        for (let i = 0; i < toItems.length; i++)
            await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
    } catch (e) {

    }
}

/* 使bot坐上最近的矿车 */
async function sitOnMinecart() {
    try {
        minecartFilter = entity => entity.name.toLowerCase() === 'minecart'
        minecart = myBot.bot.nearestEntity(minecartFilter)
        if (!minecart) {
            Tool.msgFormat.logMsg('找不到矿车')
            return
        }
        await myBot.bot.activateEntity(minecart)
    } catch (e) {
        console.log(e)
    }
}

/* 执行一次烤土豆 */
async function actCampfire() {
    //查找一个营火
    try {
        Lib.activateBlock.actBlock('campfire', minecart.position)
    } catch (e) {
        Tool.msgFormat.logMsg('没有找到营火')
        stopCampfirePotato()
    }

}

module.exports = {
    startCampfirePotato, stopCampfirePotato,
    startTossBoneMeal, stopTossBoneMeal, startCollectPotato, stopCollectPotato
}