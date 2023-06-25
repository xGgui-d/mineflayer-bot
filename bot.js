/* 我的bot对象 */
const myBot = {
    bot: null,
    hosterName: null,
    botName: null,
    // bot当前的工作
    botWork: null,
    botIsWork: false,
    // bot建立的监听标志
    botListener: {
      windowOpen: false,
      playerCollect: false
    }
  
  }

 module.exports.myBot = myBot