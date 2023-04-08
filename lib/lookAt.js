function lookAtNearestPlayer(myBot) {
    //获取最近玩家的信息，保存到playerEntity
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = myBot.bot.nearestEntity(playerFilter)
    if (!playerEntity) return
    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    myBot.bot.lookAt(pos)
}
module.exports = { lookAtNearestPlayer }