const fs = require("fs");
const logTime = (name) => {
    console.log(`Log....${name}   ` + new Date().toLocaleTimeString())
}
const delay = 1000

// CallBack 
setTimeout(() => {
    logTime('Callback')
    setTimeout(() => {
        logTime('Callback')
    }, delay)
}, delay)


// Promise
let promise = (name, delay = 1000) => new Promise(resolve => {
    setTimeout(() => {
        resolve()
        logTime(name)
    }, delay)
})
promise('Promise1')
    .then(() => {
        promise('Promise2')
    }).then(promise('Promise3'))

// Generator 和 yield 和 iterator
const generator = function* (name) {
    yield promise(name);
    yield promise(name);
}
const gen = generator('Generator')
gen.next().value.then(() => {
    gen.next()
})

// 自己实现一个同步调用的CO
let co = function(gen,name) {
    var it = gen(name);
    var ret = it.next();
    ret.value.then(function(res) {
        it.next(res);
    });
}
co(generator,'CO');

// co库 thunkify库组合 实现异步调用
co = require('co')
const Thunkify = require("thunkify");
const thunkify = Thunkify((name,callback) =>{
    setTimeout(() => {
        logTime(name)
        callback()
    })
})
co(function* (){
    yield thunkify('CO/thunkify')
    yield thunkify('CO/thunkify')
});


// Async和Await组合
(async() => {
    await promise('Async/await')
    await promise('Async/await')
})()
