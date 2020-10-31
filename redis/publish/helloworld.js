const redis = require('redis')
const subscribe = redis.createClient(6379, 'localhost')
const publish = redis.createClient(6379, 'localhost')

publish.on('ready', function (err) {
    console.log('hello, i publish')
})

subscribe.on('ready', function (err) {
    console.log('hello, i subscribe')
})

 //订阅channel1
subscribe.subscribe('channel1')

// 订阅消息
subscribe.on('subscribe', function (channel, count) {
    console.log(`got subscribe event: ${channel} and count is ${count}`)
    setInterval(()=>{
        publish.publish('channel1', `hi, i am channel one, message at ${new Date()}`)
    }, 2000) //每2秒钟发个消息
})

// 设置监听事件
subscribe.on('connect', function () {
    subscribe.on('message', function (channel, message) {
        console.log(`received message from ${channel}:${message}`)
    })
})
