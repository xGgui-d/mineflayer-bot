/* 定时从云仓取出物品并且丢弃 */

let timer_01 = null
/* 开始定时丢物品 */
async function startTossItem(itemName, count, interval) {
    if (interval < 1000 || interval == null)
        interval = 1000
    timer_01 = setInterval(() => {
        Lib.cloudInv.withdraw(itemName, count);
    }, interval) 
}
/* 停止定时丢物品 */
async function stopTossItem() {
    //清除计时器
    clearInterval(timer_01)
}
