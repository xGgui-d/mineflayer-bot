/**
*凋零骷髅塔组合功能
**/

let timer = null

//开始击杀怪物
function startKillWitherSkeleton(myBot) {
    myBot.botState.isWitherSkeleton = true;

    timer = setInterval(() => {
        equipSword(myBot)
        killAura(myBot)
    }, 100)//速砍

}

//停止击杀怪物
function stopKillWitherSkeleton(myBot) {
    myBot.botState.isWitherSkeleton = false;
    clearInterval(timer)
}

//开始把骨粉放入云仓
function startCollectBoneMeal(myBot, window) {
    myBot.botState.isWitherSkeleton = true;

    timer = setInterval(() => {
        deposit(myBot, window)
    }, 2000)//速砍

}

//开始把骨粉放入云仓
function stopCollectBoneMeal(myBot) {
    myBot.botState.isWitherSkeleton = false;

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

//从背包中筛选出要上传的物品
function getItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name === itemName)
}
//从背包中筛选出要扔的物品
function tossItems(myBot, itemName) {
    return myBot.bot.inventory.items().filter((item) => item.name != itemName && item.name != 'bone')
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
        Tool.msgFormat.logMsg(myBot, `将物品存入云仓，物品槽[${myBot.bot.inventory.emptySlotCount()}]`)
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




module.exports = { startKillWitherSkeleton, stopKillWitherSkeleton }