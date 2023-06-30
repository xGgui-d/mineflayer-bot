const { myBot } = require("../bot");
/* 任务执行模块 */

var task = null // 任务函数变量
var mode = 'once'

/* 执行任务 */
function runTask(botWork, select) {
    if (!onceTask(botWork, select))
        timerTask(botWork, select)
}

// 单次任务
function onceTask(botWork, select) {
    task = selectTaskFunc(botWork)
    if (task != null && mode === 'once') {
        task(...select)
        Tool.msgFormat.logMsg(`执行了 ${task.name} 功能`)
        return true
    }
    return false
}

// 定时任务
function timerTask(botWork, select) {
    // 如果bot当前没有工作
    if (!myBot.botIsWork) {
        startTimerTask(botWork, select)
    } // 如果bot当前正在工作，再次执行相同指令停止工作
    else if (myBot.botIsWork && myBot.botWork === botWork) {
        stopTimerTask(botWork, select)
    } else { // 在工作期间执行其他指令，告诉在忙
        myBot.bot.chat(`/tell ${myBot.hosterName} <red>『女仆当前在忙(T_T) 正在执行 ${myBot.botWork}』`)
    }
}


/* 开启定时任务 */
function startTimerTask(botWork, select) {
    if (!myBot.botIsWork) {
        mode = 'start'
        task = selectTaskFunc(botWork)
        if (task != null) {
            myBot.botIsWork = true
            myBot.botWork = botWork
            myBot.botSelect = select
            // 执行任务
            task(...select)
            Tool.msgFormat.logMsg(`执行了 ${task.name} 功能，[${botWork}] 任务开始执行`)
        } else
            myBot.bot.chat(`/tell ${myBot.hosterName} <red> 这不是正确的命令哦！！！`)
    }
}

/* 停止定时任务 */
function stopTimerTask(botWork, select) {
    if (myBot.botIsWork) {
        mode = 'stop'
        task = selectTaskFunc(botWork)
        if (task != null) {
            myBot.botIsWork = false
            myBot.botWork = null
            myBot.botSelect = select
            // 执行任务
            task(...select)
            Tool.msgFormat.logMsg(`执行了 ${task.name} 功能，[${botWork}] 任务结束执行`)
        } else
            myBot.bot.chat(`/tell ${myBot.hosterName} <red> 这不是正确的命令哦！！！`)
    }
}

// 根据命令选择任务 mode = start or stop
function __selectMode(startFunc, stopFunc) {
    // 根据实参判断任务类型
    if (arguments.length == 1) {
        // 单次任务
        mode = 'once'
        return startFunc
    } else if (arguments.length == 2) {
        // 定时任务
        switch (mode) {
            case 'start':
                return startFunc
            case 'stop':
                return stopFunc
        }
    }
}
function selectTaskFunc(cmd) {

    switch (cmd) {
        case 'sta':
            return __selectMode(OnceTask.state.showState)
        case 'tpw':
            return __selectMode(OnceTask.tp.tpWhere)
        case 'tpa':
            return __selectMode(OnceTask.tp.tpaWho)
        case 'say':
            return __selectMode(OnceTask.say.saySome)
        case 'tossa':
            return __selectMode(OnceTask.toss.tossAll)
        case 'toss':
            return __selectMode(OnceTask.toss.toss)
        case 'equip':
            return __selectMode(OnceTask.equipTool.equipTool)
        case 'look':
            return __selectMode(TimerTask.lookAtPlayer.startLookAtPlayer, TimerTask.lookAtPlayer.stopLookAtPlayer)
        case 'fish':
            return __selectMode(TimerTask.fisherman.startFishing, TimerTask.fisherman.stopFishing)
        case 'atk':
            return __selectMode(TimerTask.killAura.startKillAura, TimerTask.killAura.stopKillAura)
        case 'dpos':
            return __selectMode(TimerTask.deposit.startCollectItem, TimerTask.deposit.stopCollectItem)
        case 'wdra':
            return __selectMode(TimerTask.withdraw.startTossItem, TimerTask.withdraw.stopTossItem)
        case 'dig':
            return __selectMode(TimerTask.dig.startDigBlock, TimerTask.dig.stopDigBlock)
        case 'place':
            return __selectMode(TimerTask.place.startPlaceBlock, TimerTask.place.stopPlaceBlock)
        case 'pto_fir':
            return __selectMode(Combine.potato.startCampfirePotato, Combine.potato.stopCampfirePotato)
        case 'pto_tos':
            return __selectMode(Combine.potato.startTossBoneMeal, Combine.potato.stopTossBoneMeal)
        case 'pto_col':
            return __selectMode(Combine.potato.startCollectPotato, Combine.potato.stopCollectPotato)
        case 'pil_kil':
            return __selectMode(Combine.pillager.startKillPillager, Combine.pillager.stopKillPillager)
        case 'pil_col':
            return __selectMode(Combine.pillager.startCollectEmerald, Combine.pillager.stopCollectEmerald)
        case 'ws_kil':
            return __selectMode(Combine.witherSkeleton.startKillWitherSkeleton, Combine.witherSkeleton.stopKillWitherSkeleton)
        case 'ws_col':
            return __selectMode(Combine.witherSkeleton.startCollectBone, Combine.witherSkeleton.stopCollectBone)
        case 'iro_col':
            return __selectMode(Combine.iron.startCollectIron, Combine.iron.stopCollectIron)
        case 'test':
        default:
            return null
    }
}



module.exports = { onceTask, timerTask, startTimerTask, stopTimerTask, runTask }