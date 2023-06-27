const { myBot } = require("../bot")
const { showPublicMsg } = require("../data/headParameter")
const { runTask } = require("./task")


/* 解析消息 */

function parseMsg(jsonMsg) {
    //命令发起者
    let username = null
    //命令
    let command = null
    // 命令头
    let head = null
    // 命令选项
    var select = null

    jsonMsg = jsonMsg.toString();
    //公频信息
    var message = new RegExp(`^<(.*?)> (.*?)$`, "i").exec(jsonMsg);
    //私聊信息
    var whisper = new RegExp(`^(.*?) -> ${myBot.botName}: (.*?)$`, "i").exec(jsonMsg);
    //私有消息不为空
    if (!Tool.emptyJudge.isEmpty(whisper)) {

        username = whisper[1]
        command = whisper[2]

        // 将命令拆分成数组(arr[0] 命令头，a[1...n]为选项)
        var arr = command.split(/\s+/);
        head = arr[0]
        select = arr.splice(1)

    }
    //显示公屏聊天信息
    if (!Tool.emptyJudge.isEmpty(message)&&showPublicMsg)
        Tool.msgFormat.publicMsg(message[0])

    // 判断是否是主人
    for (var name of myBot.botInfo.hosterName) {
        if (username === name) {
            myBot.bot.chat(`/tell ${myBot.hosterName} <green>『女仆收到你的命令啦！^_^』`)
            myBot.hosterName = name
            // 执行任务
            Tool.msgFormat.logMsg(`收到命令: ${command}`)
            runTask(head, select)
        }
    }
}


module.exports = { parseMsg }