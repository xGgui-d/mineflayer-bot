/*
 * 刷石机组合功能
 * 定时将原石存入云仓 
 */

let timer_01 = null

function startCollectCobbleStone() {
    timer_01 = setInterval(() => {
        Lib.cloudInv.deposit('cobble_stone', 'true')
    }, 2000) //最低2000
}

function stopCollectCobbleStone() {
    clearInterval(timer_01)
}