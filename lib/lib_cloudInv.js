const { myBot } = require("../bot")

let mode = 'true' // mode='true' ，mode='false' 存入前不丢弃其他物品
var itemNames = [] // 当前要存入云端的物品名字
var counts = []


/**
 * 往云仓上传一次物品
 * @author xGgui
 * @param {array} _itemNames 多种物品名字
 * @param {string} _mode 'true' 存入前先丢弃其他物品；'false' 存入前不丢弃其他物品
 * @example deposit(['potato', 'coal'], 'true')
 */
async function deposit(_itemNames, _mode) {
    mode = _mode
    itemNames = _itemNames
    // 建立监听窗口
    myBot.bot.on('windowOpen', onWindowOpen)
    myBot.bot.chat('/ci put')
}

/**
 * 从云仓取出一次物品
 * @author xGgui
 * @param {array} _itemNames 多种物品名字
 * @param {array} _counts 对应物品的数量
 * @param {string} _mode 'true' 取出并丢弃；'false' 取出但不丢弃
 * @example withdraw(['potato', 'coal'], [64, 128], 'true')
 */
async function withdraw(_itemNames, _counts, _mode) {
    itemNames = _itemNames
    counts = _counts
    for (let i = 0; i < _itemNames.length; i++) {
        Tool.msgFormat.logMsg(`将 ${itemNames[i]} 从云仓取出`)
        myBot.bot.chat(`/ci get ${itemNames[i]} ${counts[i]}`)
        setTimeout(()=>{},500)
    }
    // 是否丢弃
    if (_mode === 'true') {
        // 先遍历背包的物品
        var toItems = myBot.bot.inventory.items()
        //扔掉与itemNames相同的物品
        for (let i = 0; i < toItems.length; i++) {
            if (itemNames.indexOf(toItems[i].name)!= -1) {
                try {
                    console.log('扔掉' + toItems[i].name)
                    await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
                } catch (e) { }
            }
        }
    }
}


// 监听处理
async function onWindowOpen(window) {
    let title = window.title;
    try {
        if (title === "{\"text\":\"上传物品\"}") {
            await inputItem(window)
        }
    } finally {
        //延迟一段时间在关闭
        setTimeout(() => {
            window.close();
        }, "1000")
        //取消监听
        myBot.bot.removeListener('windowOpen', onWindowOpen)
    }
}

// 将物品放入窗口
async function inputItem(window) {
    if (mode === 'true') {
        // 先遍历背包的物品
        var toItems = myBot.bot.inventory.items()

        //先扔掉与itemNames不相同的物品
        for (let i = 0; i < toItems.length; i++) {
            if (itemNames.indexOf(toItems[i].name) == -1) {
                try {
                    console.log('扔掉' + toItems[i].name)
                    await myBot.bot.toss(toItems[i].type, toItems[i].metadata, toItems[i].count)
                } catch (e) { }
            }
        }
    }
    for (var i = 0; i < itemNames.length; i++) {
        //获取与itemNames相同的物品
        let item = myBot.bot.inventory.items().filter((item) => item.name === itemNames[i])[0]
        if (Tool.emptyJudge.isEmpty(item)) {
            Tool.msgFormat.logMsg(`没有 ${itemNames[i]} 可以存入`)
            continue
        }
        // 将物品放入窗口
        try {
            await myBot.bot.transfer({
                window: window,
                itemType: item.type,
                metadata: item.metadata,
                sourceStart: 54,
                sourceEnd: 89,
                destStart: 0,
                destEnd: 53,
                count: 1728
            });
        } catch (e) {
            //数量不足1728报的错
            //console.log(e)
        }
        Tool.msgFormat.logMsg(`将 ${itemNames[i]} 存入云仓，当前物品槽[${myBot.bot.inventory.emptySlotCount()}]`)
    }
}

module.exports = { deposit, withdraw }