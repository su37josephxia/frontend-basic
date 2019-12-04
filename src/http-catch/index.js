const Koa = require('koa')
const router = require('koa-router')()
const cache = require('./cache')
const app = new Koa()

app.use(cache({
    // refresh: '0 0 0 * * ? *', // 每日0点执行
    refresh: '*/10 * * * * *', // 每十秒一次
    urlPattern: /^\/api\/data\/\w+$/,
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
setInterval(async () => {
    const id = (Math.random() * 9).toFixed()
    http.get(`http://localhost:3000/api/data/${id}`);
}, 100)
