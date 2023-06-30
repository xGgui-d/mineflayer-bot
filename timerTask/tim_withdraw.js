/* 定时从云仓取出物品并且丢弃 */
let timer_01 = null

/* 开始定时丢物品 */
async function startTossItem() {
    var itemNames = []
    var counts = []
    let interval = null
    let mode = null

    let index_name = 0
    let index_count = 0
    for (let i = 0; i < arguments.length - 2; i++) {
        if (!(i % 2)) {
            itemNames[index_name] = arguments[i]
            index_name++
        } else {
            counts[index_count] = arguments[i]
            index_count++
        }

    }
    interval = arguments[arguments.length - 2]
    mode = arguments[arguments.length - 1]

    if (interval < 1000 || interval == null)
        interval = 1000
    timer_01 = setInterval(() => {
        Lib.cloudInv.withdraw(itemNames, counts, mode);
    }, interval)
}
/* 停止定时丢物品 */
async function stopTossItem() {
    //清除计时器
    clearInterval(timer_01)
}

module.exports = { startTossItem, stopTossItem }