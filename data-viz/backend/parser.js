const puppeteer = require('puppeteer');
const parser = async (url, evaluate) => {
    const browser = await (puppeteer.launch({ //设置超时时间
        timeout: 15000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: true,
        // 关闭headless模式, 不会打开浏览器
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }));
    const page = await browser.newPage();
    await page.goto(url);
    const ret = await page.evaluate(evaluate)
    browser.close();
    return ret
}

// setTimeout(async () => {
//     const ret = await parser(`https://juejin.im/post/5e43c16df265da575918cdb6`, evaluate)
//     console.log('ret:', ret)
// })

module.exports = parser