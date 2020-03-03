const sleep = delay => new Promise(res => {
    setTimeout(() => { res() }, delay)
})

const printNumber = async number => {
    for (let v of [, , , , , , , ,]) {
        console.log('print ' + number)
        const time = (Math.random() * 100).toFixed()
        await sleep(time)
    }
}

module.exports.asyncAwait = () => {

    const job = [1,2,3,4]
    printNumber(1)
    printNumber(2)
}


module.exports.asyncAwait = () => {
    printNumber(1)
    printNumber(2)
}