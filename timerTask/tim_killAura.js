const { myBot } = require("../bot")

/* 无差别攻击周围的敌人 */
let timer
/* 开始攻击周围敌人 */
function startKillAura(entityName = 'hostile', interval) {

    timer = setInterval(() => {
        Lib.attack.atk(entityName)
    }, interval)

}

/* 停止攻击周围敌人 */
function stopKillAura() {

    clearInterval(timer)
}

module.exports = { startKillAura, stopKillAura }