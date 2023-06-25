const { myBot } = require("../bot");
let nowFishing = false // 当前是否正在钓鱼

/* 开始钓鱼 */
async function startFishing() {
    try {
        await myBot.bot.equip(myBot.bot.registry.itemsByName.fishing_rod.id, 'hand')
    } catch (err) {
        Tool.msgFormat.logMsg('身上没有钓竿')
    }
    myBot.bot.on('playerCollect', onCollect)
    nowFishing = true
    // 钓鱼一次
    try {
        await myBot.bot.fish()
    } catch (err) {
        Tool.msgFormat.logMsg('钓鱼结束')
        // 停止当前的工作
        Tool.switch.selectFunc(myBot.botWork)
    }

}

/* 停止钓鱼 */
async function stopFishing() {
    // 关闭监视
    myBot.bot.removeListener('playerCollect', onCollect)
    // 如果当前正在钓鱼，收杆
    if (nowFishing) {
        myBot.bot.activateItem()
    }
}

/* 完成垂钓一次 */
async function onCollect(player, entity) {

    if (player === myBot.bot.entity && entity.kind) {
        // 关闭监视
        myBot.bot.removeListener('playerCollect', onCollect)
        nowFishing = false
        Tool.msgFormat.logMsg('完成一次垂钓')
        // 进行下一次垂钓
        startFishing()
    }
}

module.exports = { startFishing, stopFishing }