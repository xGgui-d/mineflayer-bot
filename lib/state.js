/* 展示 bot 状态 */

async function showLine(myBot,str) {
    await myBot.bot.chat(`/tell ${myBot.hosterName} ${str}`)
    await myBot.bot.waitForTicks(2)
}

//展示一次状态
async function showState(myBot) {
        await showLine(myBot,`<red>\
         生命值[<Aqua>${myBot.bot.health.toFixed(2)}</Aqua>]\
         饥饿值[<Aqua>${myBot.bot.food.toFixed(2)}</Aqua>]\
         等级[<Aqua>${myBot.bot.experience.level}</Aqua>]\
         背包空位[<Aqua>${myBot.bot.inventory.emptySlotCount()}</Aqua>]\
         当前工作[<Aqua>${myBot.botWork}</Aqua>]\
         `)
}

module.exports = { showState }