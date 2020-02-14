const parser = require('./parser')

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
setTimeout(async () => {
    const ret = await parser(`https://juejin.im/post/5e43c16df265da575918cdb6`, evaluate)
    console.log('ret:', ret)
})