const { myBot } = require('../bot');


/**
 * 激活一次方块
 * @author xGgui
 * @param {string} blockName 方块名字
 * @param {number} distance 以自身为中心的距离
 * @example actBlock('stone', 5)
 */
async function actBlock(blockName, distance = 5) {
    const mcData = require('minecraft-data')(myBot.bot.version);
    // 查找一个目标方块
    try {
        let targetBlock = myBot.bot.findBlock({
            point: position, // 以自身坐标为中心
            matching: mcData.blocksByName[blockName].id,
            maxDistance: distance // 5格范围之内
        })
        // 打印人的位置
        // console.log(position.x)
        // console.log(position.y)
        // console.log(position.z)
        // console.log(targetBlock)
        await myBot.bot.activateBlock(targetBlock)
    } catch (e) {
        Tool.msgFormat.logMsg(myBot, '没有找到方块')
    }
}
module.exports = { actBlock }