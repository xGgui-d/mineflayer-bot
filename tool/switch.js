const { myBot } = require("../bot")
const { showPublic } = require("../data/headParameter")

/* 解析消息 */

function parseMsg(jsonMsg) {
    //命令发起者
    let username = null
    //命令
    let command = null
    //选项1
    let select_1 = null
    //选项2
    let select_2 = null

    jsonMsg = jsonMsg.toString();
    //公频信息
    var message = new RegExp(`^<(.*?)> (.*?)$`, "i").exec(jsonMsg);
    //私聊信息
    var whisper = new RegExp(`^(.*?) -> ${myBot.botName}: (.*?)$`, "i").exec(jsonMsg);
    //私有消息不为空
    if (!Tool.emptyJudge.isEmpty(whisper)) {

        username = whisper[1]
        command = whisper[2]

        head = command.split(' ')[0]
        select_1 = command.split(' ')[1]
        select_2 = command.split(' ')[2]
    }
    //显示公屏聊天信息

    if (!Tool.emptyJudge.isEmpty(message) && showPublic)
        Tool.msgFormat.publicMsg(message[0])

    // 判断是否是主人
    for (var name of botInfo.hosterName) {
        if (username === name) {
            myBot.bot.chat(`/tell ${myBot.hosterName} <green>『女仆收到你的命令啦！^_^』`)
            myBot.hosterName = name
            // 判断命令
            selectFunc(head, command, select_1, select_2)
        }
    }
}

/* 命令路由 */
function selectFunc(head, command, select_1, select_2) {

    Tool.msgFormat.logMsg(`收到命令: ${head} ${select_1} ${select_2}`)
    switch (head) {
        case 'sta':
            Tool.task.onceTask(Lib.state.showState)
            break
        case 'tpw':
            Tool.task.onceTask(Lib.tp.tpWhere, select_1)
            break
        case 'tpa':
            Tool.task.onceTask(Lib.tp.tpaWho, select_1 = myBot.hosterName)
            break
        case 'say':
            Tool.task.onceTask(Lib.say.saySome, command.substring(4))
            break
        case 'tossa':
            Tool.task.onceTask(Lib.toss.tossAll)
            break
        case 'actblk':
            Tool.task.onceTask(Lib.activateBlock.actBlock, select_1)
            break
        case 'toss':
            Tool.task.onceTask(Lib.toss.toss, select_1, select_2)
            break
        case 'dpos':
            Tool.task.onceTask(Lib.cloudInv.deposit, select_1)
            break
        case 'look':
            Tool.task.timerTask(Single.lookAtPlayer.startLookAtPlayer, Single.lookAtPlayer.stopLookAtPlayer, head)
            break
        case 'fish':
            Tool.task.timerTask(Single.fisherman.startFishing, Single.fisherman.stopFishing, head)
            break
        case 'atk':
            Tool.task.timerTask(Single.killAura.startKillAura, Single.killAura.stopKillAura, head, select_1)
            break
        case 'ato_dpos':
            Tool.task.timerTask(Single.autoDeposit.startCollectItem, Single.autoDeposit.startCollectItem, head, select_1, select_2)
            break
        case 'pto_fire':
            Tool.task.timerTask(Combine.potato.startCampfirePotato, Combine.potato.stopCampfirePotato, head)
            break
        case 'pto_bonemeal':
            Tool.task.timerTask(Combine.potato.startTossBoneMeal, Combine.potato.stopTossBoneMeal, head)
            break
        case 'pto_potato':
            Tool.task.timerTask(Combine.potato.startCollectPotato, Combine.potato.stopCollectPotato, head)
            break
        case 'pil_kill':
            Tool.task.timerTask(Combine.pillager.startKillPillager, Combine.pillager.stopKillPillager, head)
            break
        case 'pil_emerald':
            Tool.task.timerTask(Combine.pillager.startCollectEmerald, Combine.pillager.stopCollectEmerald, head)
            break
        case 'ws_kill':
            Tool.task.timerTask(Combine.witherSkeleton.startKillWitherSkeleton, Combine.witherSkeleton.stopKillWitherSkeleton, head)
            break
        case 'ws_bone':
            Tool.task.timerTask(Combine.witherSkeleton.startCollectBone, Combine.witherSkeleton.stopCollectBone, head)
            break
        case 'test':

            break
        default:
            myBot.bot.chat(`/tell ${myBot.hosterName} 这不是正确的命令哦！！！`)
            break
    }
}

module.exports = { parseMsg, selectFunc }