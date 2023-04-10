async function showLine(myBot, str) {

    await myBot.bot.chat(`/tell ${myBot.hosterName} ${str}`)
    await myBot.bot.waitForTicks(2)

}

async function showPage_01(myBot) {

    if (!myBot.botState.isSayMenu) {
        myBot.botState.isSayMenu = true

        await showLine(myBot, `<blue>------------『梦幻女仆 ❀ 命令菜单』------------</blue>`)
        await showLine(myBot, `<green>格式：</green><Aqua>/tell [命令] [选项] [选项]</Aqua>`)
        await showLine(myBot, `<green>① [lookAt]</green> <yellow>看向主人</yellow>`)
        await showLine(myBot, `<green>② [deposit] [itemName]</green> <yellow>定时将物品存入云仓</yellow>`)
        await showLine(myBot, `<green>③ [withdraw] [itemName] [itemCount]</green> <yellow>将物品从云仓取出</yellow>`)
        await showLine(myBot, `<green>④ [follow]</green> <yellow>跟随主人</yellow>`)
        await showLine(myBot, `<green>⑤ [tpa] [who]</green> <yellow>传送到某人的岛</yellow>`)
        await showLine(myBot, `<green>⑥ [tp] [where]</green> <yellow>传送到某岛</yellow>`)
        await showLine(myBot, `<green>⑦ [state]</green> <yellow>查看女仆的状态</yellow>`)
        await showLine(myBot, `<green>⑧ [attack] [entity]</green> <yellow>定时攻击周围怪物</yellow>`)
        await showLine(myBot, `<green>⑨ [say] [what]</green> <yellow>让女仆说话</yellow>`)
        await showLine(myBot, `<green>⑩ [tossAll]</green> <yellow>定时丢弃所有物品</yellow>`)
        await showLine(myBot, `<blue>------------------------------------------->> <Aqua>page 1</Aqua></blue>`)

        myBot.botState.isSayMenu = false
    }
}

async function showPage_02(myBot) {
    if (!myBot.botState.isSayMenu) {
        myBot.botState.isSayMenu = true

        await showLine(myBot, `<blue>------------『梦幻女仆 ❀ 命令菜单』------------</blue>`)
        await  showLine(myBot, `<green>格式：</green><Aqua>/tell [命令] [选项] [选项]</Aqua>`)
        await showLine(myBot, `<green>① [toss] [itemName] [itemCount]</green> <yellow>丢弃指定数量物品</yellow>`)
        await showLine(myBot, `<green>② [actBlock] [blockName]</green> <yellow>定时激活使用指定方块</yellow>`)
        await showLine(myBot, `<green>③ [potato]</green> <yellow>开启或关闭自动烤土豆(开启前请确保矿车在bot范围内)</yellow>`)
        await showLine(myBot, `<green>④ [pillager]</green> <yellow>开启或关闭自动砍杀袭击塔(开启前请确保bot穿上衣服且佩戴剑)</yellow>`)
        await showLine(myBot, `<green>... 女仆功能待开发^_^</green>`)
        await showLine(myBot, `<blue>------------------------------------------->> <Aqua>page 2</Aqua></blue>`)

        myBot.botState.isSayMenu = false
    }
}

//展示一次菜单
function showMenu(myBot, page) {
    switch (page) {
        case '1':
            showPage_01(myBot)
            break
        case '2':
            showPage_02(myBot)
            break
        default:
            showPage_01(myBot)
            break
    }

}

module.exports = { showMenu }