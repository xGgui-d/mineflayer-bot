function nowtime() {
    let time = new Date().toString().split(" ")
    return `${time[4]}`
}

module.exports = { nowtime }