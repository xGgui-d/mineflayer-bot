const vec3 = require('vec3')
const { myBot } = require('../bot')


/**
 * 挖掘一次指定方块
 * @author xGgui
 * @param {number} x 
 * @param {number} y 
 * @param {number} z  
 * @example digBlock(9226493, 29, 9218295)
 */
async function digBlock(x, y, z) {
    // 目前正在挖掘 
    if (myBot.bot.targetDigBlock) {
        Tool.msgFormat.logMsg(`当前正在挖掘`)
    } else {
        // 目标是bot坐标的偏移量下的位置的方块(offset(x,y,z) x=south y=up z=west)
        // var pos = myBot.bot.entity.position
        // pos = pos.offset(parseInt(x, 10), parseInt(y, 10), parseInt(z, 10))
        var pos = vec3(x, y, z)
        const target = myBot.bot.blockAt(pos)
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
            Tool.msgFormat.logMsg(`该方块无法被挖掘或者距离较远`)
        }
    }
}


/**
 * 放置一次指定方块
 * @author xGgui
 * @param {string} itemName 物品名称
 * @param {number} x 
 * @param {number} y 
 * @param {number} z  
 * @example placeBlock('cobble_stone', 9226493, 29, 9218295)
 */
async function placeBlock(itemName, x, y, z) {
    // 装备好方块 
    equipBlock(itemName)
    // 目标方块
    var pos = vec3(parseInt(x, 10), parseInt(y, 10), parseInt(z, 10))
    const target = myBot.bot.blockAt(pos)
    // 尝试次数
    let tryCount = 0
    try {
        // 放置方块(referenceblk是所要放置的方块旁边的方块，(0,1,0)表示是这个方块的上面位置放置))
        await myBot.bot.placeBlock(target, vec3(0, 1, 0))
        Tool.msgFormat.logMsg(`方块放置成功`)
    } catch (err) {
        tryCount++
        if (tryCount > 10) {
            Tool.msgFormat.errMsg(err.message)
        }
    }
}

// 装备指定方块
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


module.exports = { placeBlock, digBlock, equipBlock }