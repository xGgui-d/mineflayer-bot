// ============================
// 凋零骷髅塔组合功能
// ============================

const { myBot } = require("../bot")


let timer_01 = null // 定时击杀骷髅
let timer_02 = null // 定时存云仓


/* 开始击杀凋零骷髅 */
function startKillWitherSkeleton() {

    timer_01 = setInterval(() => {
        equipSword()
        Lib.attack.atk('hostile')
    }, 100)// 速砍

}

/* 停止击杀凋零骷髅 */
function stopKillWitherSkeleton() {

    clearInterval(timer_01)
}

/* 开始把骨头放入云仓 */
function startCollectBone() {
    timer_02 = setInterval(() => {
        Lib.cloudInv.deposit('bone', true)
    }, 2000) //最低2000

}

/* 停止把骨头放入云仓 */
function stopCollectBone() {
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

module.exports = {
    startKillWitherSkeleton, stopKillWitherSkeleton,
    startCollectBone, stopCollectBone
}