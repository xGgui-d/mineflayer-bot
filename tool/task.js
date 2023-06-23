
//单次任务
function onceTask(myBot, func, select_1 = null, select_2 = null) {
    Tool.msgFormat.logMsg(myBot, `执行了 ${func.name} 功能`)
    func(myBot, select_1, select_2);
}

//定时任务
function timerTask(myBot, startFunc, stopFunc, botWork) {

    // 如果bot当前没有工作
    if (!myBot.botIsWork) {
        myBot.botIsWork = true
        myBot.botWork = botWork
        startFunc(myBot)
        Tool.msgFormat.logMsg(myBot, `执行了 ${startFunc.name} 功能`)
    } // 如果bot当前正在工作，再次执行相同指令停止工作
    else if (myBot.botIsWork && myBot.botWork === botWork) {
        myBot.botIsWork = false
        myBot.botWork = null
        stopFunc(myBot)
        Tool.msgFormat.logMsg(myBot, `执行了 ${stopFunc.name} 功能`)
    }else { // 在工作期间执行其他指令，告诉在忙
        myBot.bot.chat(`/tell ${myBot.hosterName} <red>『女仆当前在忙(T_T) 正在执行 ${myBot.botWork}』`)
    }
}



module.exports = { onceTask, timerTask }