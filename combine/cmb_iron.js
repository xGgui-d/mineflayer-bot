/*
 * 刷铁机组合功能
 * 定时将铁定存入云仓 
 */
let timer_01 = null

function startCollectIron() {
    timer_01 = setInterval(() => {
        Lib.cloudInv.deposit('iron_ingot', 'true')
    }, 2000) //最低2000
}

function stopCollectIron() {
    clearInterval(timer_01)
}

module.exports = { startCollectIron, stopCollectIron }
