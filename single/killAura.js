let timer
function startKillAura(myBot, entityName = 'hostile') {
    myBot.botState.isKillAura = true
    timer = setInterval(() => {
        Lib.attack.atk(myBot, entityName)
    }, 200)

}
function stopKillAura(myBot) {
    myBot.botState.isKillAura = false
    clearInterval(timer)
}
module.exports = { startKillAura, stopKillAura }