# 梦幻女仆 Bot 帮助文档

![](https://img.shields.io/github/stars/xGgui-d?color=yellow&style=plastic)

调用 [mineflayer](https://github.com/PrismarineJS/mineflayer) 库开发的适用于梦幻之屿服务器 (ip: play.islet.world ) 的脚本机器人

适用于各种生电机器挂机操作 ( 包括但不限于 afk, killAura 等 )

## 安装教程

* 下载并安装 node.js
* 进入目录 `\..\mineflayer-bot` 在该目录下执行 cmd 打开命令窗口
* 依次输入

```sh
npm init
npm install mineflayer
# 等待...
```

* 安装完成后执行

```sh
node app.js
```

## 账号参数修改

**账号信息修改**

打开文件 `\..\mineflayer-bot\data\headParameter.js` 进行修改即可

## 帮助命令

**单次事件功能（只执行一次）**

* `sta` 查看当前女仆状态
* `tpw <岛屿标号（带#）>` 女仆传送到指定岛屿
* `tp <玩家名字（默认是主人）>` 女仆传送到指定玩家所在的岛屿
* `say <话语（可以是命令，自行加入/）>` 女仆说话
* `tossa` 女仆丢弃背包所有物品
* `toss <物品名字> <物品数量>` 女仆丢弃背包指定数量的物品
* `actblk <方块名字>` 女仆激活（右键）一次周围的方块
* `dpos <物品名字>` 女仆上传指定物品到云仓（数量为1728）

**定时事件功能（输入一次命令开始执行，再次输入结束执行）**

* `look` 女仆看向周围最近的玩家
* `fish` 女仆钓鱼
* `atk <实体名称>` 女仆攻击指定的实体

**组合事件功能**

* 凋零骷髅塔组合功能

  * `ws_kill` 女仆攻击凋零骷髅
  * `ws_bone` 女仆定时上传骨头到云仓（上传前会丢弃非骨头物品）

* 土豆机以及烤土豆组合功能

  * `pto_fire` 女仆坐上矿车，并且不断激活周围的营火

  > 使用技巧：
  >
  > 先将女仆放在矿车周围，然后执行上述命令，女仆会坐到车上，然后不断检测周围的营火并拿着土豆去激活营火（烤土豆的过程）

  * `pto_potato` 女仆定时上传土豆（毒土豆）到云仓（上传前不会丢弃物品）
  * `pto_bonemeal` 女仆定时丢弃骨粉

* 掠夺者塔组合功能

  * `pil_kill` 女仆攻击卫道士等怪物
  * `pil_emerald` 女仆定时上传绿宝石到云仓

* 猪人塔组合功能