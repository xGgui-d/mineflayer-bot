async function actBlock(myBot, blockName) {
    const mcData = require('minecraft-data')(myBot.bot.version);

    //查找一个目标方块
    try {
        let targetBlock = myBot.bot.findBlock({

            matching: mcData.blocksByName[blockName].id,
            maxDistance: 5//32格范围之内
        })

        if (!targetBlock) return

        await myBot.bot.activateBlock(targetBlock)
        
    } catch (e) {
        Tool.msgFormat.logMsg(myBot, '没有找到方块')
    }


}
module.exports = { actBlock }