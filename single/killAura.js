const { myBot } = require("../bot")

/* 无差别攻击周围的敌人 */
let timer
/* 开始攻击周围敌人 */
function startKillAura(entityName = 'hostile') {

    timer = setInterval(() => {
        Lib.attack.atk(entityName)
    }, 200)

}

/* 停止攻击周围敌人 */
function stopKillAura() {

    clearInterval(timer)
}

module.exports = { startKillAura, stopKillAura }