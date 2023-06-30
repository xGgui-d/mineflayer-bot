const mineflayer = require('mineflayer')
const autoeat = require('mineflayer-auto-eat').plugin

// const inventoryViewer = require('mineflayer-web-inventory')

console.log(`loading tool modle ...`)
Tool = {}
Tool.msgFormat = require('./tool/tool_msgFormat')
Tool.getNowTime = require('./tool/tool_getNowTime')
Tool.switch = require('./tool/tool_parseMsg')
Tool.task = require('./tool/tool_task')
Tool.emptyJudge = require('./tool/tool_emptyJudge')

console.log(`loading lib modle ...`)
Lib = {}
Lib.cloudInv = require('./lib/lib_cloudInv')
Lib.lookAt = require('./lib/lib_lookAt')
Lib.attack = require('./lib/lib_attack')
Lib.activateBlock = require('./lib/lib_activateBlock')
Lib.digger = require('./lib/lib_digger')


console.log(`loading combine module ...`)
Combine = {}
Combine.potato = require('./combine/cmb_potato')
Combine.pillager = require('./combine/cmb_pillager')
Combine.witherSkeleton = require('./combine/cmb_witherSkeleton')
Combine.zombiePig = require('./combine/cmb_zombiePig')
Combine.iron = require('./combine/cmb_iron')

console.log(`loading timerTask module ...`)
TimerTask = {}
TimerTask.killAura = require('./timerTask/tim_killAura')
TimerTask.lookAtPlayer = require('./timerTask/tim_lookAtPlayer')
TimerTask.fisherman = require('./timerTask/tim_fish')
TimerTask.deposit = require('./timerTask/tim_deposit')
TimerTask.withdraw = require('./timerTask/tim_withdraw')
TimerTask.dig = require('./timerTask/tim_dig')
TimerTask.place = require('./timerTask/tim_place')

console.log(`loading onceTask module ...`)
OnceTask = {}
OnceTask.toss = require('./onceTask/one_toss')
OnceTask.say = require('./onceTask/one_say')
OnceTask.tp = require('./onceTask/one_tp')
OnceTask.state = require('./onceTask/one_state')
OnceTask.equipTool = require('./onceTask/one_equipTool')

console.log(`loading data module ...`)
Data = {}
Data.headParameter = require('./data/headParameter')


const prompt = require("prompt-sync")();
let botInfo // bot信息

var input = prompt("请选择你的女仆? 1: xGgui 2: sakuraminooka 3: KLis21");
// 选择要登录的女仆
switch (input) {
  case '1':
    botInfo = Data.headParameter.botInfo.botInfo_01
    break
  case '2':
    botInfo = Data.headParameter.botInfo.botInfo_02
    break
  case '3':
    botInfo = Data.headParameter.botInfo.botInfo_03
    break
  default:
    botInfo = Data.headParameter.botInfo.botInfo_01
    break
}

// 解除监听的限制
require('events').EventEmitter.defaultMaxListeners = 0

// 获取bot对象
const { myBot } = require('./bot')

// 断开连接后保存当前的工作
let lastwork = null
let lastwork_select = []

// 是否正在创建bot
let isCreateBot = true
// 设置定时器，用来重启bot
let timer = null
// 记录重连次数
var reconnectCount = 1

/* 重连bot */
function reconnect() {
  reconnectCount++
  isCreateBot = true
  timer = setInterval(createBot, 15000) // 15s重启一次
}

/* 创建bot */
function createBot() {
  if (!isCreateBot) {
    clearInterval(timer)
    return
  }
  myBot.botInfo = botInfo
  myBot.botName = botInfo.botName
  myBot.bot = mineflayer.createBot({
    host: botInfo.host,
    port: botInfo.port,
    username: botInfo.username,
    password: botInfo.password,
    auth: botInfo.auth,
    version: '1.19'
  })

  /* 登录成功 */
  myBot.bot.on('login', () => {
    Tool.msgFormat.titleMsg('|***************************************|');
    Tool.msgFormat.titleMsg('|****登录成功!!!欢迎使用梦幻女仆 BOT****|');
    Tool.msgFormat.titleMsg('|***************************************|');
    Tool.msgFormat.titleMsg(`女仆ID: ${myBot.botName} [待执行的 work: ${lastwork} ${lastwork_select}]`);
    // 连接网页，查看bot的背包情况 http://localhost:3000/
    // inventoryViewer(myBot.bot)
    // 执行上次的工作
    runPreviousWork()
    // 创建bot完毕 
    isCreateBot = false
  })

  /* 登录失败 */
  myBot.bot.on('error', (err) => {
    // 如果当前不在创建bot的话
    if (!isCreateBot) {
      Tool.msgFormat.errMsg(`女仆登录失败, 正在尝试重连(${reconnectCount})... [待执行的工作: ${lastwork} ${lastwork_select}]`)
      Tool.msgFormat.errMsg(err)
      // 保存当前工作
      saveCurrentWork()
      reconnect()
    }
  })

  /* 与服务器断开连接 */
  myBot.bot.on('end', (reason) => {
    if (!isCreateBot) {
      Tool.msgFormat.errMsg(`女仆已与服务器断开连接, 正在尝试重连(${reconnectCount})... [待执行的工作: ${lastwork} ${lastwork_select}]`)
      Tool.msgFormat.errMsg(reason)
      // 保存当前工作
      saveCurrentWork()
      reconnect()
    }
  })

  /* 被服务器踢出 */
  myBot.bot.on('kicked', (reason) => {
    if (!isCreateBot) {
      Tool.msgFormat.errMsg(`女仆已被服务器踢出, 正在尝试重连(${reconnectCount})... [待执行的工作: ${lastwork} ${lastwork_select}]`)
      Tool.msgFormat.errMsg(reason)
      // 保存当前工作
      saveCurrentWork()
      reconnect()
    }
  })

  /* 加载自动吃食物插件 */
  myBot.bot.loadPlugin(autoeat)
  myBot.bot.once('spawn', () => {
    myBot.bot.autoEat.options = {
      priority: 'foodPoints',
      startAt: 19,//食物到达19开始吃
      bannedFood: []
    }
  })
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

  /* 消息解析以及路由 */
  myBot.bot.on('message', (jsonMsg) => {
    Tool.switch.parseMsg(jsonMsg)
  })
}

console.log(`login in server ...`)
// 首次创建bot
createBot()

/* 登录错误异常处理 */
function saveCurrentWork() {
  // 保存当前的工作
  if (myBot.botWork != null) {
    lastwork = myBot.botWork
    lastwork_select = myBot.botSelect
  }
  // 停止当前工作
  Tool.task.stopTimerTask(myBot.botWork, myBot.botSelect)
}
function runPreviousWork() {
  // 执行掉线前的任务
  if (lastwork != null)
    Tool.task.startTimerTask(lastwork, lastwork_select)
}

