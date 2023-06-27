const { myBot } = require("../bot")
/*
 * 袭击塔组合功能
 * 定时击杀卫道士
 * 定时存入绿宝石到云仓
 */

let timer_01 = null
let timer_02 = null

/* 开始击杀怪物 */
function startKillPillager() {

    timer_01 = setInterval(() => {
        equipSword()
        Lib.attack.atk('hostile')
    }, 1500)//30tick 1500

}

/* 停止击杀怪物 */
function stopKillPillager() {
    clearInterval(timer_01)
}

/* 开始把绿宝石放入云仓 */
function startCollectEmerald() {
    timer_02 = setInterval(() => {
        Lib.cloudInv.deposit('emerald', true)
    }, 2000) //最低2000

}

/* 停止把绿宝石放入云仓 */
function stopCollectEmerald() {
    clearInterval(timer_02)
}

/* 装备剑 */
function equipSword() {
    let swords = [
        'iron_sword',
        'diamond_sword',
        'netherite_sword'
    ]

    let sword = null
    let tmp = null
    for (let i = 0; i < 3; i++) {
        tmp = myBot.bot.inventory.findInventoryItem(myBot.bot.registry.itemsByName[swords[i]].id)
        if (!Tool.emptyJudge.isEmpty(tmp))
            sword = tmp
    }

    if (Tool.emptyJudge.isEmpty(sword)) {
        Tool.msgFormat.logMsg(`身上没有铁级别以上的剑`)
        return
    }

    myBot.bot.equip(sword, "hand")
}

module.exports = { startKillPillager, stopKillPillager, startCollectEmerald, stopCollectEmerald }