/*
*袭击塔组合功能
*/

let timer = null

//开始击杀怪物
function startKillPillager(myBot) {
    myBot.botState.isPillager = true;

    timer = setInterval(() => {
        equipSword(myBot)
        killAura(myBot)
    }, 100)//30tick 1500

}

//停止击杀怪物
function stopKillPillager(myBot) {
    myBot.botState.isPillager = false;
    clearInterval(timer)
}

//杀戮光环
function killAura(myBot) {
    //过滤器
    let entityFilter
    try {
        entityFilter = entity => entity.type === 'hostile'
    } catch (e) {
        console.log(e)
    }
    //获取bot最近的怪物生物
    let entity
    entity = myBot.bot.nearestEntity(entityFilter)

    if (!entity) {
        Tool.msgFormat.logMsg(myBot, '没有实体可以攻击')
        return;
    }

    const pos = entity.position
    //lookat怪物，并且执行函数
    myBot.bot.lookAt(pos, true)
    //攻击生物
    myBot.bot.attack(entity, true)
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
module.exports = { startKillPillager, stopKillPillager }