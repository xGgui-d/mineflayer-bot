const mineflayer = require('mineflayer')
const autoeat = require('mineflayer-auto-eat').plugin

console.log(`loading tool modle ...`)
Tool = {}
Tool.msgFormat = require('./tool/msgFormat')
Tool.getNowTime = require('./tool/getNowTime')
Tool.switch = require('./tool/switch')
Tool.task = require('./tool/task')
Tool.emptyJudge = require('./tool/emptyJudge')


console.log(`loading lib modle ...`)
Lib = {}
Lib.cloudInv = require('./lib/cloudInv')
Lib.follow = require('./lib/follow')
Lib.lookAt = require('./lib/lookAt')
Lib.attack = require('./lib/attack')
Lib.toss = require('./lib/toss')
Lib.activateBlock = require('./lib/activateBlock')
Lib.say = require('./lib/say')
Lib.tp = require('./lib/tp')
Lib.state = require('./lib/state')
Lib.menu = require('./lib/menu')

console.log(`loading combine module ...`)
Combine = {}
Combine.potato = require('./combine/potato')
Combine.pillager = require('./combine/pillager')

//解除监听的限制
require('events').EventEmitter.defaultMaxListeners = 0


//我的bot对象
const myBot = {
  bot: null,
  hosterName: 'sakuraminooka',
  botName: 'xGgui',
  botState: {
    isLookAt: false,
    isDeposit: false,
    isFollow: false,
    isAttack: false,
    isTossAll: false,
    isActBlock: false,
    isSayMenu: false,
    isSayState: false,

    isPotato: false,
    isPillager: false
  },
  ciItemName: null

}

//创建bot
function createBot() {
  myBot.bot = mineflayer.createBot({
    host: 'play.islet.world',
    port: 25565,
    username: '1723172785@qq.com',
    password: '344509dgh',
    auth: 'microsoft'
  });

  //单人测试
  // bot = mineflayer.createBot({
  //   host: '127.0.0.1',
  //   port: 53015,
  //   username: 'xGgui'
  // });

  //登录成功
  myBot.bot.once('login', () => {
    Tool.msgFormat.titleMsg('|***************************************|');
    Tool.msgFormat.titleMsg('|***SUCCESS LOGIN WECOME TO xGgui BOT***|');
    Tool.msgFormat.titleMsg('|***************************************|');
  })

  //登录失败
  myBot.bot.on('error', () => Tool.msgFormat.errMsg('登录失败，正在尝试重新登录...'));

  //重启延迟60s
  myBot.bot.on('end', () => {
    Tool.msgFormat.errMsg('BOT已与服务器断开连接，正在重连...')
    setTimeout(() => {
      createBot();
    }, 60000)
  });

  //窗口打开
  myBot.bot.on("windowOpen", async (window) => {
    let title = window.title;
    try {
      if (title === "{\"text\":\"上传物品\"}") {
        Tool.task.onceTask(myBot, Lib.cloudInv.deposit, window)
      }
    } finally {
      //延迟一段时间在关闭
      setTimeout(() => {
        window.close();
      }, "1000");
    }
  });

  //加载自动吃食物插件
  myBot.bot.loadPlugin(autoeat)
  myBot.bot.once('spawn', () => {
    myBot.bot.autoEat.options = {
      priority: 'foodPoints',
      startAt: 19,//食物到达19开始吃
      bannedFood: []
    }
  })
  myBot.bot.on('autoeat_started', () => {
    Tool.msgFormat.logMsg(myBot, '开饭了')
  })
  myBot.bot.on('health', () => {
    //血量到达20，禁用插件
    if (myBot.bot.food === 20) myBot.bot.autoEat.disable()
    else myBot.bot.autoEat.enable()
  })

  //消息路由
  myBot.bot.on('message', (jsonMsg) => {
    Tool.switch.switchFunc(myBot, jsonMsg)
  })
}
console.log(`login in server ...`)
createBot()