function titleMsg(str) {
    console.log('\033[32m' + `${str}` + '\033[0m')
}

//打印日志的格式
function logMsg(myBot, str) {
    console.log('\033[32m' + `[${Tool.getNowTime.nowtime()}]` + '\033[0m' + '\033[35m' + `<${myBot.botName}> ${str}` + '\033[0m')
}

function errMsg(str) {
    console.error(str)
}

function publicMsg(str) {
    console.log('\033[32m' + `[${Tool.getNowTime.nowtime()}]` + '\033[0m' + '\033[36m' + `${str}` + '\033[0m')
}

module.exports = { titleMsg, logMsg, errMsg, publicMsg }
