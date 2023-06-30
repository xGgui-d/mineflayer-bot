const { myBot } = require("../bot")
/* 看向周围最近的玩家 */
let timer = null


function startLookAtPlayer(entityName = 'player') {
    timer = setInterval(() => {
        Lib.lookAt.lookAtNearestPlayer(entityName)
    }, 10)
}

function stopLookAtPlayer() {
    clearInterval(timer)
}

module.exports = { startLookAtPlayer, stopLookAtPlayer }