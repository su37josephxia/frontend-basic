const http = require('http')

http.createServer((res,req) => {
    console.log('res:',res.url)

    setTimeout(() => {
        console.log('response:')
        req.end('hello')

    },1500)
})
.listen(3000,() => {
    console.log('server at 3000')
})