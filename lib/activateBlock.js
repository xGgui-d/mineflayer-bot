//激活一个方块

async function actBlock(myBot, blockName, position = null) {
    const mcData = require('minecraft-data')(myBot.bot.version);

    // 打印方块的位置
    // console.log(position.x)
    // console.log(position.y)
    // console.log(position.z)
    
    //查找一个目标方块
    //异常
    // try {
        let targetBlock = myBot.bot.findBlock({
            point: position,
            matching: mcData.blocksByName[blockName].id,
            maxDistance: 5//5格范围之内
        })

        await myBot.bot.activateBlock(targetBlock)
    // } catch (e) {
    //     Tool.msgFormat.logMsg(myBot, '没有找到方块')
    // }


}
module.exports = { actBlock }