//路由函数
function switchFunc(myBot, jsonMsg) {
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

        //console.log(`command.substr(4): ${command.substring(4)}`)
        // console.log(`head: ${head}`)
        // console.log(`select_1: ${select_1}`)
        // console.log(`select_2: ${select_2}`)

        Tool.msgFormat.logMsg(myBot, `收到命令: ${head} ${select_1} ${select_2}`)

    }
    if (!Tool.emptyJudge.isEmpty(message))
        console.log('\033[32m' + `[${Tool.getNowTime.nowtime()}]` + '\033[0m' + '\033[36m' + `${message[0]}` + '\033[0m')

    //判断主人
    if (username === myBot.hosterName)
        myBot.bot.chat(`/tell ${myBot.hosterName} <green>女仆收到你的命令啦！^_^</green>`)
    else return
    //判断命令
    switch (head) {
        case 'menu':
            Tool.task.onceTask(myBot, Lib.menu.showMenu, select_1)
            break
        case 'state':
            Tool.task.onceTask(myBot, Lib.state.showState)
            break
        case 'tp':
            Tool.task.onceTask(myBot, Lib.tp.tpWhere, select_1)
            break
        case 'tpa':
            Tool.task.onceTask(myBot, Lib.tp.tpaWho, select_1)
            break
        case 'say':
            Tool.task.onceTask(myBot, Lib.say.saySome, command.substring(4))
            break
        case 'toss':
            Tool.task.onceTask(myBot, Lib.toss.toss, select_1, select_2)
            break
        case 'lookAt':
            Tool.task.timeTask(myBot, Lib.lookAt.lookAtNearestPlayer, 'isLookAt', 10)
            break
        case 'deposit':
            myBot.ciItemName = select_1
            Tool.task.timeTask(myBot, () => { myBot.bot.chat('/ci put') }, 'isDeposit', 3000)
            break
        case 'follow':
            if (!myBot.botState.isFollow) {
                Lib.follow.followPlayer(myBot, true)
                myBot.botState.isFollow = true
            } else {
                Lib.follow.followPlayer(myBot, false)
                myBot.botState.isFollow = false
            }
            break
        case 'attack':
            Tool.task.timeTask(myBot, Lib.attack.atk, 'isAttack', 1000, select_1)
            break
        case 'tossAll':
            Tool.task.timeTask(myBot, Lib.toss.tossAll, 'isTossAll', 5000)
            break
        case 'actBlock':
            Tool.task.timeTask(myBot, Lib.activateBlock.actBlock, 'isActBlock', 500, select_1)
            break
        case 'potato':
            Tool.task.combineTask(myBot, Combine.potato.startCampfirePotato, Combine.potato.stopCampfirePotato, 'isPotato')
            break
        case 'pillager':
            Tool.task.combineTask(myBot, Combine.pillager.startKillPillager, Combine.pillager.stopKillPillager, 'isPillager')
            break
        case 'test01':
            break
        default:
            myBot.bot.chat(`/tell ${myBot.hosterName} 这不是正确的命令哦, 需要帮忙吗? 私密我输入: menu page`)
            break

    }
}

module.exports = { switchFunc }