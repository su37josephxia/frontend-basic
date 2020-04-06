const http = require('http')
function updateTime() {
    setInterval(() => this.time = new Date().toUTCString(), 10000)
    return this.time
}
http.createServer((req, res) => {
    console.log('url:', `${req.method} ${req.url} `)

    const { url } = req
    if ('/' === url) {
        // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
        // res.setHeader('Cache-Control', 'max-age=10')
        res.end(`
            <html>
                <!-- <meta http-equiv="Refresh" content="5" /> -->
                Html Update Time: ${updateTime()}
                <script src='main.js'></script>
               
            </html>
            `)
    } else if (url === '/main.js') {
        console.log('url:',req.url)
        // console.log('if-modified-since :' ,req.headers['if-modified-since'])
        // console.log('Head If-None-Match:', req.headers['if-none-match'])

        const content = `document.writeln('<br>JS   Update Time:${updateTime()}')`
        // 强缓存
        // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())

        // res.setHeader('Cache-Control', 'public,max-age=20')

        // res.setHeader('Cache-Control', 'pragma: no-cache')
        

        // 协商缓存 Last Modified
        // res.setHeader('Cache-Control', 'no-cache')
        // res.setHeader('last-modified', new Date().toUTCString())
        // if (new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
        //     console.log('协商缓存命中....')
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }


        // 协商缓存 Etag If-None-Match
        res.setHeader('Cache-Control', 'no-cache')
        const crypto = require('crypto');
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Etag', hash)
        if(req.headers['if-none-match'] === hash || true){
            console.log('Etag协商缓存命中.....')
            res.statusCode = 304
            res.end()
            return 
        }

        res.statusCode = 200
        res.end(content)
    } else if (url === '/favicon.ico') {
        console.log('favicon..')
        res.setHeader('Cache-Control', 'max-age=100')
        res.end('')
    }
})
    .listen(3000, () => {
        console.log('Http Cache Test at:' + 3000)
    })