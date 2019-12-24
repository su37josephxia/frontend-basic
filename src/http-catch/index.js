const Koa = require('koa')
const router = require('koa-router')()
const cache = require('./cache')
const app = new Koa()

var path = require('path')



app.use(async (ctx, next) => {
    console.log('url: ', ctx.url)
    await next()

    const { response,request } = ctx
    // 强缓存方式
    // response.set('pragma', 'no-cache');
    // max-age 值是精确到秒，设置过期时间为 3秒
    // response.set('cache-control', `max-age=${1 * 3}`);
    // 添加 expires 字段到响应头，过期时间 2 分钟
    // console.log(new Date(Date.now() + 2 * 60 * 1000).toUTCString())
    // response.set('expires', new Date(Date.now() + 2 * 60 * 1000).toUTCString());


    // 协商缓存
    // response.set('pragma', 'no-cache');
    const ifModifiedSince = request.headers['if-modified-since'];
    console.log('ifModifiedSince',ifModifiedSince)
    const LastModified = response.headers['Last-Modified']
    console.log('Last-Modified:',LastModified)

    console.log('Now',new Date().toUTCString())
    // const lastModified = imageStatus.mtime.toGMTString();

})

var staticCache = require('koa-static-cache')
app.use(staticCache(path.join(__dirname, '/'), {
  maxAge: 365 * 24 * 60 * 60
}))
const static = require('koa-static')
app.use(static(__dirname + '/'))



app.use(cache({
    // refresh: '0 0 0 * * ? *', // 每日0点执行
    refresh: '*/10 * * * * *', // 每十秒一次
    prefix: '/api/data', // 优先于urlPattern
    // urlPattern: /^\/api\/data\/\w+$/,
}))
const delay = (tick, data) => new Promise(resolve => {
    setTimeout(() => resolve(data), tick)
})
router.get('/api/data/:id', async (ctx, next) => {
    // 模拟延时数据
    ctx.body = await delay(200, { id: ctx.params.id })
})
app.use(router.routes())
const port = 3000
app.listen(port, () => {
    console.log(`启动服务，http://localhost:${port}`)
})

// 测试代码自动加载
const http = require('http');
// setInterval(async () => {
//     const id = (Math.random() * 9).toFixed()
//     http.get(`http://localhost:3000/api/data/${id}`);
// }, 100)
