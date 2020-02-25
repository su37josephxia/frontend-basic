const parser = require('./parser')
const { resolve } = require('path')
const fs = require('fs-extra')

const evaluate = () => {
    // // 标题
    // let title = document
    //     .querySelector('.article-title')
    //     .innerText

    // // 作者
    // let author = document
    //     .querySelector('.author-info-box .username')
    //     .innerText
    // // 浏览数
    // let view = document
    //     .querySelector('.views-count')
    //     .innerText
    //     .split(' ')[1]

    // // 点赞数
    // let commment = document
    //     .querySelector('.action-bar .comment-action .action-title')
    //     .innerHTML


    // // 留言数
    // let praise = document
    //     .querySelector('.action-bar .praise-action .action-title')
    //     .innerHTML

    // return {
    //     author,
    //     title,
    //     view,
    //     commment,
    //     praise
    // }
    return {}
}
// setTimeout(async () => {
//     const ret = await parser(`http://localhost:3000`, evaluate)
//     console.log('ret:', ret)
// })


const schedule = require("node-schedule");
const interval = '*/1 * * * * *'
const job = async () => {
    const dir = resolve(__dirname, '../log/log.json')
    let json
    try {
        json = fs.readJSONSync(dir)
    } catch (e) {
        json = []
    }
    const result = await parser(`http://localhost:3000`, evaluate)
    // const result = await parser(`https://abc1231`, evaluate)
    result.createTime = new Date()
    console.log(`========${result.createTime}=========`)

    console.log('JOB run：', result)
    json.push(result)

    // 写入文件
    fs.writeJsonSync(dir, json)
}
schedule.scheduleJob(interval, async () => {
    try {
        await job()
        console.log('=========success=======')
    } catch (error) {
        console.log('schedule Error', error)
    }
})