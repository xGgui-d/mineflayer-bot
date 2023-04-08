function nowtime() {
    let time = new Date().toString().split(" ")
    return `${time[3]} ${time[2]} ${time[4]}`
}

module.exports = { nowtime }