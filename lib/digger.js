const vec3 = require('vec3')
const { myBot } = require('../bot')
/* 建筑功能包括 放置方块 装备方块 挖掘方块 */

/* 
 * 挖掘一次指定方块
 * xyz是以当前bot为坐标的偏移量 x=south y=up z=west 
 * (0,-1,0) 表示当前bot脚下的方块
 */
async function digBlock(blockName, x, y, z) {
    let target // 目标方块
    // 目前正在挖掘 
    if (myBot.bot.targetDigBlock) {
        Tool.msgFormat.logMsg(`当前正在挖掘 ${blockName}`)
    } else {
        // 目标是bot坐标的偏移量下的位置的方块(offset(x,y,z) x=south y=up z=west)
        target = myBot.bot.blockAt(myBot.bot.entity.position.offset(x, y, z))
        // 如果目标存在并且方块可以挖掘并且够得着
        if (target && myBot.bot.canDigBlock(target)) {
            Tool.msgFormat.logMsg(`开始挖掘 ${target.name}`)
            try {
                // 挖掘目标方块
                await myBot.bot.dig(target)
                // 挖掘完毕
                Tool.msgFormat.logMsg(`挖掘完毕 ${target.name}`)
            } catch (err) {
                console.log(err.stack)
            }
        } else {
            Tool.msgFormat.logMsg(`该方块无法被挖掘`)
        }
    }
}

/* 
 * 放置一次指定的方块 
 * xyz是以当前bot为坐标的偏移量 x=south y=up z=west
 * (0,-1,0) 表示当前bot脚下的方块
 */
async function placeBlock(itemName, x, y, z) {
    // 装备好方块 
    equipBlock(itemName)
    // 目标方块
    const referenceBlock = myBot.bot.blockAt(bot.entity.position.offset(x, y, z))
    // 尝试次数
    let tryCount = 0
    try {
        // 放置方块(referenceblk是所要放置的方块旁边的方块，(0,1,0)表示是这个方块的上面位置放置))
        await myBot.bot.placeBlock(referenceBlock, vec3(0, 1, 0))
        Tool.msgFormat.logMsg(`方块放置成功`)
    } catch (err) {
        tryCount++
        if (tryCount > 10) {
            Tool.msgFormat.errMsg(err.message)
        }
    }
}

/* 装备指定方块 */
async function equipBlock(itemName) {
    let itemsByName
    if (myBot.bot.supportFeature('itemsAreNotBlocks')) {
        itemsByName = 'itemsByName'
    } else if (myBot.bot.supportFeature('itemsAreAlsoBlocks')) {
        itemsByName = 'blocksByName'
    }
    try {
        await myBot.bot.equip(myBot.bot.registry[itemsByName].itemName.id, 'hand')
        Tool.msgFormat.logMsg(`装备 ${itemName} 成功`)
    } catch (err) {
        Tool.msgFormat.errMsg(err.message)
    }
}



function sayItems(items = bot.inventory.items()) {
    const output = items.map(itemToString).join(', ')
    if (output) {
        bot.chat(output)
    } else {
        bot.chat('empty')
    }
}

function itemToString(item) {
    if (item) {
        return `${item.name} x ${item.count}`
    } else {
        return '(nothing)'
    }
}

module.exports = { placeBlock, digBlock, equipBlock }