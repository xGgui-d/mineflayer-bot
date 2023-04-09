//定时任务函数
function timeTask(myBot, func, stateName, rate, select_1 = null, select_2 = null) {

    if (!myBot.botState[stateName]) {
        myBot.botState[stateName] = true
        Tool.msgFormat.logMsg(myBot, `开启了 ${func.name} 功能`)
    }
    else {
        myBot.botState[stateName] = false
        Tool.msgFormat.logMsg(myBot, `关闭了 ${func.name} 功能`)
    }

    var timer = setInterval(() => {
        if (myBot.botState[stateName]) {
            if (typeof func === "function") {
                func(myBot, select_1, select_2)
            }
        } else { clearInterval(timer) }
    }, rate)

}

//单次任务
function onceTask(myBot, func, select_1 = null, select_2 = null) {
    Tool.msgFormat.logMsg(myBot, `执行了 ${func.name} 功能`)
    func(myBot, select_1, select_2);
}

//组合任务
function combineTask(myBot, startFunc, stopFunc, stateName, select_1 = null) {

    if (!myBot.botState[stateName]) {
        myBot.botState[stateName] = true
        startFunc(myBot,select_1)
        Tool.msgFormat.logMsg(myBot, `开启了 ${startFunc.name} 功能`)
    }
    else {
        myBot.botState[stateName] = false
        stopFunc(myBot,select_1)
        Tool.msgFormat.logMsg(myBot, `关闭了 ${stopFunc.name} 功能`)
    }
}

module.exports = { timeTask, onceTask, combineTask }