/*
 * 凋零骷髅塔组合功能
 * 定时击杀凋零骷髅
 * 定时将骨头放入云仓
 */

const { myBot } = require("../bot")


let timer_01 = null // 定时击杀骷髅
let timer_02 = null // 定时存云仓


/* 开始击杀凋零骷髅 */
function startKillWitherSkeleton() {

    timer_01 = setInterval(() => {
        Lib.attack.atk('hostile')
    }, 100)// 速砍

}

/* 停止击杀凋零骷髅 */
function stopKillWitherSkeleton() {

    clearInterval(timer_01)
}

/* 开始把骨头放入云仓 */
function startCollectBone() {
    timer_02 = setInterval(() => {
        Lib.cloudInv.deposit('bone', 'true')
    }, 2000) //最低2000

}

/* 停止把骨头放入云仓 */
function stopCollectBone() {
    clearInterval(timer_02)
}



module.exports = {
    startKillWitherSkeleton, stopKillWitherSkeleton,
    startCollectBone, stopCollectBone
}