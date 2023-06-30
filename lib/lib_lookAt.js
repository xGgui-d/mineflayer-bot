const { myBot } = require("../bot")

/**
 * 看向一次某人
 * @author xGgui
 * @param {string} entityName 实体名字
 * @example lookAtNearestPlayer('player')
 */
function lookAtNearestPlayer(entityName) {
    //获取最近玩家的信息，保存到playerEntity
    const playerFilter = (entity) => entity.type === entityName
    const playerEntity = myBot.bot.nearestEntity(playerFilter)
    if (!playerEntity) return
    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    myBot.bot.lookAt(pos)
}
module.exports = { lookAtNearestPlayer }