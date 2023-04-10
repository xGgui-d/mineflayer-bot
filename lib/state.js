async function showLine(myBot,str) {
    await myBot.bot.chat(`/tell ${myBot.hosterName} ${str}`)
    await myBot.bot.waitForTicks(2)
}

//展示一次状态
async function showState(myBot) {
    if (!myBot.botState.isSayState) {

        myBot.botState.isSayState = true

        await showLine(myBot,`<blue>------『梦幻女仆 ❀ 女仆状态』------</blue>`)
        await showLine(myBot,`<red>生命值[<Aqua>${myBot.bot.health.toFixed(2)}</Aqua>] 饥饿值[<Aqua>${myBot.bot.food.toFixed(2)}</Aqua>] 等级[<Aqua>${myBot.bot.experience.points}</Aqua>]</red>`)
        await showLine(myBot,`<red>背包空位[<Aqua>${myBot.bot.inventory.emptySlotCount()}</Aqua>]</red>`)
        await showLine(myBot,`<green>LookAt[<Aqua>${myBot.botState.isLookAt}</Aqua>] Deposit[<Aqua>${myBot.botState.isDeposit}</Aqua>] Follow[<Aqua>${myBot.botState.isFollow}</Aqua>]</green>`)
        await showLine(myBot,`<green>Attack[<Aqua>${myBot.botState.isAttack}</Aqua>] TossAll[<Aqua>${myBot.botState.isTossAll}</Aqua>] ActBlock[<Aqua>${myBot.botState.isActBlock}</Aqua>]</green>`)
        await showLine(myBot,`<blue>--------------------------------------</blue>`)

        myBot.botState.isSayState = false
    }


}

module.exports = { showState }