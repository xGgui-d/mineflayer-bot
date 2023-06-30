/* 自动挖掘 */
let timer_01 = null
function startDigBlock(x, y, z) {
    timer_01 = setInterval(async () => {
        await Lib.digger.digBlock(parseInt(x, 10), parseInt(y, 10), parseInt(z, 10))
    }, 100)
}

function stopDigBlock() {
    clearInterval(timer_01)
}


module.exports = { startDigBlock, stopDigBlock }