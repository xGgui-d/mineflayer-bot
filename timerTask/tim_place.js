/* 自动放置 */
let timer_01 = null
function startPlaceBlock(itemName, x, y, z) {
    timer_01 = setInterval(async () => {
        await Lib.digger.placeBlock(itemName, parseInt(x, 10), parseInt(y, 10), parseInt(z, 10))
    }, 100)
}

function stopPlaceBlock() {
    clearInterval(timer_01)
}


module.exports = { startPlaceBlock, stopPlaceBlock }