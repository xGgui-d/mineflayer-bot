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
Lib.lookAt = require('./lib/lookAt')
Lib.attack = require('./lib/attack')
Lib.toss = require('./lib/toss')
Lib.activateBlock = require('./lib/activateBlock')
Lib.say = require('./lib/say')
Lib.tp = require('./lib/tp')
Lib.state = require('./lib/state')


console.log(`loading combine module ...`)
Combine = {}
Combine.potato = require('./combine/potato')
Combine.pillager = require('./combine/pillager')
Combine.witherSkeleton = require('./combine/witherSkeleton')
Combine.zombiePig = require('./combine/zombiePig')

console.log(`loading single module ...`)
Single = {}
Single.killAura = require('./single/killAura')
Single.lookAtPlayer = require('./single/lookAtPlayer')
Single.fisherman = require('./single/fisherman')
Single.autoDeposit = require('./single/autoDeposit')

console.log(`loading data module ...`)
Data = {}
Data.headParameter = require('./data/headParameter')

// 解除监听的限制
require('events').EventEmitter.defaultMaxListeners = 0

// 获取bot对象
const { myBot } = require('./bot')

// 断开连接后保存当前的工作
let lastwork = null

/* 创建bot */
function createBot() {

  myBot.botName = Data.headParameter.botInfo.botName
  myBot.bot = mineflayer.createBot({
    host: Data.headParameter.botInfo.host,
    port: Data.headParameter.botInfo.port,
    username: Data.headParameter.botInfo.username,
    password: Data.headParameter.botInfo.password,
    auth: Data.headParameter.botInfo.auth,
    version: '1.19'
  });

  var logSuccess = false

  //登录成功
  myBot.bot.once('login', () => {
    Tool.msgFormat.titleMsg('|***************************************|');
    Tool.msgFormat.titleMsg('|****登录成功!!!欢迎使用梦幻女仆 BOT****|');
    Tool.msgFormat.titleMsg('|***************************************|');
    Tool.msgFormat.titleMsg(`BOTNAME: ${myBot.botName}`);
    // 执行掉线前的任务
    Tool.switch.selectFunc(lastwork)
    logSuccess = true
  })


  //登录失败
  myBot.bot.on('error', () => {

    logSuccess = false
    Tool.msgFormat.errMsg('登录失败，请尝试重新登录...')
    setTimeout(() => {
      //再次创建bot
      createBot()
    }, 10000)

  });

  //重启延迟60s
  myBot.bot.on('end', () => {
    if (!logSuccess)
      return
    Tool.msgFormat.errMsg('BOT已与服务器断开连接，正在重连...')
    // 保存当前的工作
    lastwork = myBot.botWork
    // 停止当前工作
    Tool.switch.selectFunc(myBot.botWork)
    setTimeout(() => {
      //再次创建bot
      createBot()
    }, 6000)
  });

  // 加载自动吃食物插件
  myBot.bot.loadPlugin(autoeat)
  myBot.bot.once('spawn', () => {
    myBot.bot.autoEat.options = {
      priority: 'foodPoints',
      startAt: 19,//食物到达19开始吃
      bannedFood: []
    }
  })
  // !!!!
  myBot.bot.on('autoeat_started', () => {
    Tool.msgFormat.logMsg('开饭了,停止工作!')


  })
  myBot.bot.on('autoeat_stopped', () => {
    Tool.msgFormat.logMsg('吃完了,开始工作!')

  })
  myBot.bot.on('health', () => {
    //血量到达20，禁用插件
    if (myBot.bot.food === 20) myBot.bot.autoEat.disable()
    else myBot.bot.autoEat.enable()
  })


  // 消息解析以及路由
  myBot.bot.on('message', (jsonMsg) => {
    Tool.switch.parseMsg(jsonMsg)
  })

}

console.log(`login in server ...`)
createBot()
