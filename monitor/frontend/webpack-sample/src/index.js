console.log('hello world..')

function uploadError({ lineno, colno, error: { stack }, timeStamp, message,filename }) {
    // 过滤
    const info = { lineno, colno, stack, timeStamp, message ,filename}

    console.log('error', info, JSON.stringify(info))
    const str = new Buffer(JSON.stringify(info)).toString("base64");
    // Base64.encode(JSON.stringify(info))
    console.log('str:', str)
    const host = 'http://localhost:7001/monitor/error'
    new Image().src = `${host}?info=${str}`

}

window.addEventListener('error', errorInfo => {
    console.log('EventListener:', errorInfo)

    uploadError(errorInfo)
    return true
}, true)

setTimeout(() => {
    xxx(1223)
}, 1000)
