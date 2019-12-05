const schedule = require("node-schedule");
module.exports = (
    config = {
        refresh: '0 0 0 * * ? *', // 每日0点执行
        // refresh: '*/1 * * * * *', // 每秒一次
        urlPattern: /^\/api\/data\/\w+$/,
    }

) => {
    let cacheStore = {}

    // 定时清理缓存
    schedule.scheduleJob(config.refresh, () => {
        console.log('定时清空缓存')
        cacheStore = {}
    })
    
    return async (ctx, next) => {
        const start = new Date();
        const { url, method } = ctx
        console.log('index:',url.indexOf(config.prefix))
        const isNeedCatch = (
            (config.prefix !== '' && url.indexOf(config.prefix) === 0) ||
            config.urlPattern.test(url)
        ) && method === 'GET'

        // 判断是否需要缓存
        if (isNeedCatch) {
            const cache = cacheStore[url]
            if (cache) {
                ctx.body = cacheStore[url]
                const duration = new Date() - start;
                console.log(ctx.method + " " + ctx.path + " " + ctx.status + " " + duration + "ms " + " 缓存");
                return
            }
            await next()

            // 添加缓存
            cacheStore[url] = ctx.body
        }
        const duration = new Date() - start;
        console.log(
            ctx.method + " " + ctx.path + " " + ctx.status + " " + duration + "ms" + " 请求"
        );
    }
}



