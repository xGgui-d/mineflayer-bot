/* 打印格式 */


// 启动程序开头信息格式
function titleMsg(str) {
    console.log('\x1b[32m' + `${str}` + '\x1b[0m')
}

// 打印日志的格式
function logMsg(myBot, str) {
    console.log('\x1b[32m' + `[${Tool.getNowTime.nowtime()}]` + '\x1b[0m' + '\x1b[35m' + `<${myBot.botName}> ${str}` + '\x1b[0m')
}

// 错误信息格式
function errMsg(myBot, str) {
    console.log('\x1b[32m' + `[${Tool.getNowTime.nowtime()}]` + '\x1b[0m' + '\x1b[31m' + `<${myBot.botName}> ${str}` + '\x1b[0m')
}

// 公频聊天格式
function publicMsg(str) {
    console.log('\x1b[32m' + `[${Tool.getNowTime.nowtime()}]` + '\x1b[0m' + '\x1b[36m' + `${str}` + '\x1b[0m')
}

module.exports = { titleMsg, logMsg, errMsg, publicMsg }
