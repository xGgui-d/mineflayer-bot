const { myBot } = require("../bot");
/* 任务执行模块 */

var task // 任务函数变量

function runTask(botWork, select) {

    if (!onceTask(botWork, select))
        timerTask(botWork, select)
}

// 任务数据结构体
// var task_v = {
//     mode: null,
//     select: [],
//     func: null
// }


//单次任务
function onceTask(botWork, select) {
    task = selectTaskFunc(botWork)
    if (task != null) {
        task(...select)
        Tool.msgFormat.logMsg(`执行了 ${task.name} 功能`)
        return true
    }
    // myBot.bot.chat(`/tell ${myBot.hosterName} 这不是正确的命令哦！！！`)
    return false
}

//定时任务
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
    if (myBot.botIsWork)
        return
    task = selectTaskFunc(botWork, 'start')
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

/* 停止定时任务 */
function stopTimerTask(botWork, select) {
    if (!myBot.botIsWork)
        return
    task = selectTaskFunc(botWork, 'stop')
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

/* 根据命令选择任务 mode = start or stop*/
function __selectMode(startFunc, stopFunc, mode) {
    switch (mode) {
        case 'start':
            return startFunc
        case 'stop':
            return stopFunc
    }
}
function selectTaskFunc(cmd, mode) {

    switch (cmd) {
        case 'sta':
            return Lib.state.showState
        case 'tpw':
            return Lib.tp.tpWhere
        case 'tpa':
            return Lib.tp.tpaWho
        case 'say':
            return Lib.say.saySome
        case 'tossa':
            return Lib.toss.tossAll
        case 'actblk':
            return Lib.activateBlock.actBlock
        case 'toss':
            return Lib.toss.toss
        case 'dpos':
            return Lib.cloudInv.deposit
        case 'look':
            return __selectMode(Single.lookAtPlayer.startLookAtPlayer, Single.lookAtPlayer.stopLookAtPlayer, mode)
        case 'fish':
            return __selectMode(Single.fisherman.startFishing, Single.fisherman.stopFishing, mode)
        case 'atk':
            return __selectMode(Single.killAura.startKillAura, Single.killAura.stopKillAura, mode)
        case 'ato_dpos':
            return __selectMode(Single.autoDeposit.startCollectItem, Single.autoDeposit.startCollectItem, mode)
        case 'pto_fire':
            return __selectMode(Combine.potato.startCampfirePotato, Combine.potato.stopCampfirePotato, mode)
        case 'pto_bonemeal':
            return __selectMode(Combine.potato.startTossBoneMeal, Combine.potato.stopTossBoneMeal, mode)
        case 'pto_potato':
            return __selectMode(Combine.potato.startCollectPotato, Combine.potato.stopCollectPotato, mode)
        case 'pil_kill':
            return __selectMode(Combine.pillager.startKillPillager, Combine.pillager.stopKillPillager, mode)
        case 'pil_emerald':
            return __selectMode(Combine.pillager.startCollectEmerald, Combine.pillager.stopCollectEmerald, mode)
        case 'ws_kill':
            return __selectMode(Combine.witherSkeleton.startKillWitherSkeleton, Combine.witherSkeleton.stopKillWitherSkeleton, mode)
        case 'ws_bone':
            return __selectMode(Combine.witherSkeleton.startCollectBone, Combine.witherSkeleton.stopCollectBone, mode)
        default:
            return null
    }
}



module.exports = { onceTask, timerTask, startTimerTask, stopTimerTask, runTask }