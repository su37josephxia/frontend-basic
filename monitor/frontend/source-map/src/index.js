console.log('hello world..')

function uploadError({ lineno, colno, error: { stack }, timeStamp, message,filename }) {
    // 过滤
    const info = { lineno, colno, stack, timeStamp, message ,filename}

    console.log('error', info, JSON.stringify(info))
    const str = new Buffer(JSON.stringify(info)).toString("base64");

    console.log('str:', str)
    const host = 'http://localhost:7001/error'
    new Image().src = `${host}?info=${str}`

}

window.addEventListener('error', errorInfo => {
    console.log('EventListener:', errorInfo)

    uploadError(errorInfo)
    return true
}, true)





setTimeout(() => {
    abc(123)
}, 1000)
