// bot: xGgui
botInfo_01 = {
    // 服务器ip
    host: 'play.islet.world',
    // 服务器端口，默认25565
    port: 25565,
    // 女仆账号邮箱
    username: '1723172785@qq.com',
    // 女仆邮箱密码
    password: '344509dgh',
    // 微软登录
    auth: 'microsoft',
    // 主人id
    hosterName: ['KLis21', 'sakuraminooka', '自定义', 'xGgui'],
    // 女仆id
    botName: 'xGgui',
}

// bot: sakuraminooka
botInfo_02 = {
    // 服务器ip
    host: 'play.islet.world',
    // 服务器端口，默认25565
    port: 25565,
    // 女仆账号邮箱
    username: '1109010232@qq.com',
    // 女仆邮箱密码
    password: 'mushenyhzy9820',
    // 微软登录
    auth: 'microsoft',
    // 主人id
    hosterName: ['KLis21', 'xGgui', '自定义'],
    // 女仆id
    botName: 'sakuraminooka',
}

// bot: KLis21
botInfo_03 = {
    // 服务器ip
    host: 'play.islet.world',
    // 服务器端口，默认25565
    port: 25565,
    // 女仆账号邮箱
    username: 'k20143190@163.com',
    // 女仆邮箱密码
    password: 'K20143190',
    // 微软登录
    auth: 'microsoft',
    // 主人id
    hosterName: ['sakuraminooka', 'xGgui', '自定义'],
    // 女仆id
    botName: 'KLis21',
}
const prompt = require("prompt-sync")();



var input = prompt("请选择你的 bot? 1: xGgui 2: sakuraminooka 3: KLis21");

// 选择要登录的女仆
// 01 xGgui
// 02 sakuraminooka
// 03 KLis21
switch (input) {
    case '1':
        botInfo = botInfo_01
        break
    case '2':
        botInfo = botInfo_02
        break
    case '3':
        botInfo = botInfo_03
        break
    default:
        botInfo = botInfo_01
        break
}
var showPublic
input = prompt("是否显示公屏聊天信息? (y/n)");
if (input === 'y') showPublic = true
else if (input === 'n') showPublic = false
else showPublic = true



module.exports = { botInfo, showPublic }