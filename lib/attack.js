/* 攻击一次实体 */
function atk(myBot, entityName) {

    //过滤器
    let entityFilter
    try {
        entityFilter = entity => entity.name.toLowerCase() === entityName

    } catch (e) {
        console.log(e)
    }
    //获取bot最近的怪物生物
    let entity
    if (entityName === null) {
        entity = myBot.bot.nearestEntity()
    } else {
        entity = myBot.bot.nearestEntity(entityFilter)
    }
    if (!entity) {
        Tool.msgFormat.logMsg(myBot, '没有实体可以攻击')
        return;
    }
    const pos = entity.position
    //lookat怪物，并且执行函数
    myBot.bot.lookAt(pos, true)
    //攻击生物
    myBot.bot.attack(entity, true)
    //Tool.msgFormat.logMsg(myBot, `攻击了一下${entityName}`)
}

module.exports = { atk }
