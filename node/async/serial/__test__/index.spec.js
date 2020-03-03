const { callback, promise, generator, asyncAwait,event } = require('../index')

describe('异步', () => {

    // test('callback', done => {
    //     callback()
    //     // 延时4s结束
    //     setTimeout(done, 1000)
    // })

    // test('promise', done => {
    //     promise()

    //     // 延时4s结束
    //     setTimeout(done, 1000)
    // })

    // test('generator',done => {
    //     const {generator} = require('../index')
    //     generator()
    //     setTimeout(done, 1000)
    // })


    // test('asyncAwait', async (done) => {
    //     await asyncAwait()
    //     setTimeout(done, 1000)
    // })

    test('event', async (done) => {
        await event()
        setTimeout(done, 1000)
    })
})

