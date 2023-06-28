/* 定时把指定物品存入云仓 */
let timer_01 = null


/* 开始把物品放入云仓 1次最多传入1728 */
function startCollectItem(itemName, interval, mode) {
    //interval = parseInt(interval,10)
    if (interval < 3000 || interval == null)
        interval = 3000
    timer_01 = setInterval(() => {
        Lib.cloudInv.deposit(itemName, Boolean(mode))
    }, interval) //单位毫秒
}

/* 停止把物品放入云仓 */
function stopCollectItem() {
    clearInterval(timer_01)
}

module.exports = { startCollectItem, stopCollectItem }