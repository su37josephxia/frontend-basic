const fs = require('fs-extra')
const { resolve } = require('path')
const schedule = require("node-schedule");
const parser = require('./parser')

// 每种
// const interval = '0 0/10 * * * ? *'

// 每十分钟
const interval = '* */10 * * * *'

// 每十秒钟
// const interval = '*/10 * * * * *'

const evaluate = () => {
    // 标题
    let title = document
        .querySelector('.article-title')
        .innerText

    // 作者
    let author = document
        .querySelector('.author-info-box .username')
        .innerText
    // 浏览数
    let view = document
        .querySelector('.views-count')
        .innerText
        .split(' ')[1]

    // 点赞数
    let commment = document
        .querySelector('.action-bar .comment-action .action-title')
        .innerHTML


    // 留言数
    let praise = document
        .querySelector('.action-bar .praise-action .action-title')
        .innerHTML

    return {
        author,
        title,
        view,
        commment,
        praise
    }
}

const job = async () => {
    const dir = resolve(__dirname, '../log/log.json')
    let json
    try {
        json = fs.readJSONSync(dir)
    } catch (e) {
        json = []
    }
    const result = await parser(`https://juejin.im/post/5e43c16df265da575918cdb6`, evaluate)
    result.createTime = new Date()
    console.log(`========${result.createTime}=========`)
    console.log('JOB run：',result)
    json.push(result)

    // 写入文件
    fs.writeJsonSync(dir, json)
}


// 每10秒触发一次
schedule.scheduleJob(interval, job)


