const { myBot } = require('../bot');

/* 激活一次方块 */
async function actBlock(blockName, position = null) {
    const mcData = require('minecraft-data')(myBot.bot.version);

    //查找一个目标方块
    //异常
    try {
        let targetBlock = myBot.bot.findBlock({
            point: position,
            matching: mcData.blocksByName[blockName].id,
            maxDistance: 5//5格范围之内
        })
        // 打印人的位置
        //console.log(position.x)
        //console.log(position.y)
        //console.log(position.z)
        //console.log(targetBlock)
        await myBot.bot.activateBlock(targetBlock)
    } catch (e) {
        Tool.msgFormat.logMsg(myBot, '没有找到方块')
    }


}
module.exports = { actBlock }