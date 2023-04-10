let timer

function startLookAtPlayer(myBot, entityName = 'player') {
    myBot.botState.isLookAt = true
    timer = setInterval(() => {
        Lib.lookAt.lookAtNearestPlayer(myBot, entityName)
    }, 10)
}

function stopLookAtPlayer(myBot) {
    myBot.botState.isLookAt = false
    clearInterval(timer)
}

module.exports = { startLookAtPlayer, stopLookAtPlayer }