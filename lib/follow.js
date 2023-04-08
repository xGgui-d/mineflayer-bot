function followPlayer(myBot, isopen) {
    //导入寻路插件
    const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
    const GoalFollow = goals.GoalFollow
    //加载插件
    myBot.bot.loadPlugin(pathfinder)
    //通过向这个数组传递玩家的名字会返回那个玩家的对象
    const playerFilter = (entity) => entity.type === 'player'
    let playerCI = myBot.bot.nearestEntity(playerFilter)
    if (!playerCI) {
        Tool.msgFormat.logMsg(myBot, '周围没有玩家')
        return
    }
    playerCI = myBot.bot.players[myBot.hosterName];

    //加载mcdata模块，里面包含mc的原版信息，需要包括版本,bot.version返回该机器人所在的版本
    const mcData = require('minecraft-data')(myBot.bot.version)
    //创建一个finder包的一个类
    const movements = new Movements(myBot.bot, mcData)
    myBot.bot.pathfinder.setMovements(movements)

    const goal = new GoalFollow(playerCI.entity, 1)
    myBot.bot.pathfinder.setGoal(goal, isopen)
}

module.exports = { followPlayer }