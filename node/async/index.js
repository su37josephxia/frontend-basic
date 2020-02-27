const logTime = (name) => {
    console.log(`Log....${name}   ` + new Date().toLocaleTimeString())
}

exports.callback = () => {
    setTimeout(() => {
        logTime('callback 1')
        setTimeout(() => {
            logTime('callback 2')
        }, 100)
    }, 100)
}

const promise = (name, delay = 100) => new Promise(resolve => {
    setTimeout(() => {
        logTime(name)
        resolve()
    }, delay)
})

exports.promise = () => {

    promise('Promise1')
        .then(promise('Promise2'))
        .then(promise('Promise3'))
        .then(promise('Promise4'))
}
let co = function (gen, name) {
    var it = gen(name)
    var ret = it.next()
    ret.value.then(function (res) {
        it.next(res)
    })
}
exports.generator = () => {
    const generator = function* (name) {
        yield promise(name + 1)
        yield promise(name + 2)
        yield promise(name + 3)
        yield promise(name + 4)
    }
    let co = generator => {
        if (it = generator.next().value) {
            it.then(res => {
                co(generator)
            })
        } else {
            return
        }
    }

    co(generator('Co-Generator'))
}

exports.asyncAwait = async () => {
    await promise('Async/Await1')
    await promise('Async/Await2')
    await promise('Async/Await3')
    await promise('Async/Await4')
}

exports.event = async () => {
    const asyncFun = name => event => {
        setTimeout(() => {
            logTime(name)
            event.emit('end')
        }, 100)
        return event
    }

    const ary = [
        asyncFun('event1'),
        asyncFun('event2'),
        asyncFun('event3')
    ]

    const { EventEmitter } = require('events')
    const event = new EventEmitter()
    let i = 0
    event.on('end', () => i < ary.length && ary[i++](event))
    event.emit('end')

}
