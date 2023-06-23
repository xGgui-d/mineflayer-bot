/* 看向周围最近的玩家 */

let timer = null

function startLookAtPlayer(myBot, entityName = 'player') {
    timer = setInterval(() => {
        Lib.lookAt.lookAtNearestPlayer(myBot, entityName)
    }, 10)
}

function stopLookAtPlayer() {
    clearInterval(timer)
}

module.exports = { startLookAtPlayer, stopLookAtPlayer }