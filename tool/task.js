
//单次任务
function onceTask(myBot, func, select_1 = null, select_2 = null) {
    Tool.msgFormat.logMsg(myBot, `执行了 ${func.name} 功能`)
    func(myBot, select_1, select_2);
}

//定时任务
function timerTask(myBot, startFunc, stopFunc, stateName) {

    if (!myBot.botState[stateName]) {
        myBot.botState[stateName] = true
        startFunc(myBot)
        Tool.msgFormat.logMsg(myBot, `开启了 ${startFunc.name} 功能`)
    }
    else {
        myBot.botState[stateName] = false
        stopFunc(myBot)
        Tool.msgFormat.logMsg(myBot, `关闭了 ${stopFunc.name} 功能`)
    }
}



module.exports = { onceTask, timerTask }