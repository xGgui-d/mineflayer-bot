/**
*凋零骷髅塔组合功能
**/

let timer_01 = null
let timer_02 = null

//开始击杀凋零骷髅
function startKillWitherSkeleton(myBot) {

    timer_01 = setInterval(() => {
        equipSword(myBot)
        Lib.attack.atk(myBot, 'hostile')
    }, 100)//速砍

}

//停止击杀凋零骷髅
function stopKillWitherSkeleton() {
    clearInterval(timer_01)
}

//开始把骨粉放入云仓
function startCollectBoneMeal(myBot) {
    timer_02 = setInterval(() => {
        Lib.cloudInv.deposit(myBot, 'bone_meal')
    }, 2000) //最低2000

}

//停止把骨粉放入云仓
function stopCollectBoneMeal() {
    clearInterval(timer_02)
}

//装备剑
function equipSword(myBot) {
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
        Tool.msgFormat.logMsg(myBot, `身上没有铁级别以上的剑`)
        return
    }

    myBot.bot.equip(sword, "hand")
}





module.exports = {
    startKillWitherSkeleton, stopKillWitherSkeleton,
    startCollectBoneMeal, stopCollectBoneMeal
}