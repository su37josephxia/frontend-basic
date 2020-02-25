

const fs = require('fs-extra')
const { resolve } = require('path')
const schedule = require("node-schedule");
const parser = require('./parser')

// 每种
// const interval = '*/10 * * * * ? *'

// 每十分钟
const interval = '* */10 * * * *'

// 每十秒钟
// const interval = '*/3 * * * * *'

const evaluate = () => {
    // 作者
    let author = document
        .querySelector('.username')
        .innerText
    // 浏览数
    let view = document
        .querySelectorAll('.stat-item .count')[4]
        .innerHTML.replace(',', '')

    // 点赞数
    let praise = document.querySelectorAll('.stat-item .count')[5]
        .innerHTML.replace(',', '')


    return {
        author,
        view,
        praise
    }
}

const job = async () => {
    const dir = resolve(__dirname, '../log/home.json')
    let json
    try {
        json = fs.readJSONSync(dir)
    } catch (e) {
        json = []
    }
    const result = await parser(`https://juejin.im/user/593e0a32a0bb9f006b560bad`, evaluate)
    result.createTime = new Date()
    console.log(`========${result.createTime}=========`)

    console.log('JOB run：', result)
    json.push(result)

    // 写入文件
    fs.writeJsonSync(dir, json)
}


// 每10秒触发一次
schedule.scheduleJob(interval, async () => {
    try {
        await job()
        console.log('=========success=======')
    } catch (error) {
        console.log('schedule Error', error)
    }
})


