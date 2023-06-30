const { myBot } = require("../bot")

let materials = ['wooden', 'stone', 'golden', 'iron', 'diamond', 'netherite']

/**
* 装备工具到主手
* @author xGgui
* @param {string} toolKind 工具类别，'axe' 'pickaxe' 'sword' 'shovel' 'hoe'
* @example equipTool('axe')
*/
function equipTool(toolKind) {
    var tools = []
    for (let i = 0; i < materials.length; i++) {
        tools[i] = materials[i] + '_' + toolKind
    }
    let tmp = null
    let tool = null
    for (let i = 0; i < tools.length; i++) {
        try {
            tmp = myBot.bot.inventory.findInventoryItem(myBot.bot.registry.itemsByName[tools[i]].id)
        } catch (err) { }
        if (!Tool.emptyJudge.isEmpty(tmp))
            tool = tmp
    }

    if (Tool.emptyJudge.isEmpty(tool)) {
        Tool.msgFormat.logMsg(`身上没有工具`)
        return
    }

    myBot.bot.equip(tool, "hand")
}

module.exports = { equipTool }