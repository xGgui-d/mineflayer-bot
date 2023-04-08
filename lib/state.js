async function showLine(myBot,str) {
    await myBot.bot.chat(`/tell ${myBot.hosterName} ${str}`)
    await myBot.bot.waitForTicks(2)
}

async function showState(myBot) {
    if (!myBot.botState.isSayState) {

        myBot.botState.isSayState = true

         showLine(myBot,`<blue>------『梦幻女仆 ❀ 女仆状态』------</blue>`)
         showLine(myBot,`<red>生命值[<Aqua>${myBot.bot.health.toFixed(2)}</Aqua>] 饥饿值[<Aqua>${myBot.bot.food.toFixed(2)}</Aqua>] 等级[<Aqua>${myBot.bot.experience.points}</Aqua>]</red>`)
         showLine(myBot,`<red>背包空位[<Aqua>${myBot.bot.inventory.emptySlotCount()}</Aqua>]</red>`)
         showLine(myBot,`<green>LookAt[<Aqua>${myBot.botState.isLookAt}</Aqua>] Deposit[<Aqua>${myBot.botState.isDeposit}</Aqua>] Follow[<Aqua>${myBot.botState.isFollow}</Aqua>]</green>`)
         showLine(myBot,`<green>Attack[<Aqua>${myBot.botState.isAttack}</Aqua>] TossAll[<Aqua>${myBot.botState.isTossAll}</Aqua>] ActBlock[<Aqua>${myBot.botState.isActBlock}</Aqua>]</green>`)
         showLine(myBot,`<blue>--------------------------------------</blue>`)

        myBot.botState.isSayState = false
    }


}

module.exports = { showState }