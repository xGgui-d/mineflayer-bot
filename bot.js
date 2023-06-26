/* 我的bot对象 */
const myBot = {
    // bot 对象
    bot: null,
    // bot 当前命令的主人
    hosterName: null, 
    // bot 名字
    botName: null,
    // bot 的info
    botInfo: null,
    // bot 当前的工作
    botWork: null, // 工作命令头
    botSelect: [], // 工作参数
    botIsWork: false, // 是否正在工作
  }

 module.exports.myBot = myBot