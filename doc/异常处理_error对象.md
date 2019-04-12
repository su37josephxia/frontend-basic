# 异常处理-error对象
### 参考资料
Javascript异常(exception)处理机制详解 JS、异常Error属性

![img](http://o7cqr8cfk.bkt.clouddn.com/17-2-26/45429735-file_1488080174982_10ffe.png)

> 注意：

1. thow后面就是我们要抛出的异常对象。在以前的时候都是出现错误的时候浏览器抛出异常对象，只是现在是我们自己主动抛出的异常对象。
2. 只要有异常对象抛出，不管是浏览器抛出的，还是代码主动抛出，都会让程序停止执行。如果想让程序继续执行，则有也可以用try…catch来捕获。
3. 每一个错误类型都可以传入一个参数，表示实际的错误信息。
4. 我们可以在适当的时候抛出任何我们想抛出的异常类型。`throw new SyntaxError("语法错误...");`

> 看下面的代码:

```javascript
<script>



    /*该函数接收一个数字，返回他的平方。*/



    function foo(num) {



        if(typeof num == "number"){



            return num * num;



        }else{



            throw new TypeError("类型错误，你应该传入一个数字...")



        }



    }



    console.log(foo(33))



    console.log(foo("abc"))



</script>
```

- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- 10
- 11
- 12

![img](http://o7cqr8cfk.bkt.clouddn.com/17-2-26/59326444-file_1488085488950_15617.png)

### 2.2 抛出自定义类型的错误对象

>  我们不仅仅可以抛出js内置的错误类型的对象，也可以自定义错误类型，然后抛出自定义错误类型的对象。
>
>  如果要自定义错误类型，只需要继承任何一个自定义错误类型都可以。一般直接继承Error即可。

```javascript
<script>



    function MyError(message) {



        this.message = "注意：这是自定义的错误"



        this.name = "自定义错误";



    }



    MyError.prototype = new Error();



    try {



        throw new MyError("注意：这是自定义错误类型")



    }catch (error){



        console.log(error.message)



    }



</script>
```

- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- 10
- 11
- 12





# async/await 优雅的错误处理方法

一般情况下 async/await 在错误处理方面，主要使用 

```
try/catch
```

，像这样



```
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is me')
        }, 1000)
    })
}

(async () => {
    try {
        const data = await fetchData()
        console.log('data is ->', data)
    } catch(err) {
        console.log('err is ->', err)
    }
})()
复制代码
```

这么看，感觉倒是没什么问题，如果是这样呢？有多个异步操作，需要对每个异步返回的 error 错误状态进行不同的处理，以下是示例代码

```
const fetchDataA = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is A')
        }, 1000)
    })
}

const fetchDataB = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is B')
        }, 1000)
    })
}

const fetchDataC = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is C')
        }, 1000)
    })
}

(async () => {
    try {
        const dataA = await fetchDataA()
        console.log('dataA is ->', dataA)
    } catch(err) {
        console.log('err is ->', err)
    }

    try {
        const dataB = await fetchDataB()
        console.log('dataB is ->', dataB)
    } catch(err) {
        console.log('err is ->', err)
    }

    try {
        const dataC = await fetchDataC()
        console.log('dataC is ->', dataC)
    } catch(err) {
        console.log('err is ->', err)
    }
})()
复制代码
```

这样写代码里充斥着 `try/catch`，有代码洁癖的你能忍受的了吗？这时可能会想到只用一个 `try/catch`。

```
// ... 这里 fetch 函数省略

(async () => {
    try {
        const dataA = await fetchDataA()
        console.log('dataA is ->', dataA)
        const dataB = await fetchDataB()
        console.log('dataB is ->', dataB)
        const dataC = await fetchDataC()
        console.log('dataC is ->', dataC)
    } catch(err) {
        console.log('err is ->', err)
        // 难道要定义 err 类型，然后判断吗？？
        /**
         * if (err.type === 'dataA') {
         *  console.log('dataA err is', err)
         * }
         * ......
         * */
    }
})()
复制代码
```

如果是这样写只会增加编码的复杂度，而且要多写代码，这个时候就应该想想怎么优雅的解决，`async/await` 本质就是 `promise` 的语法糖，既然是 `promise` 那么就可以使用 `then` 函数了

```
(async () => {
    const fetchData = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    const data = await fetchData().then(data => data ).catch(err => err)
    console.log(data)
})()
复制代码
```

在上面写法中，如果 fetchData 返回 resolve 正确结果时，data 是我们要的结果，如果是 reject 了，发生错误了，那么 data 是错误结果，这显然是行不通的，再对其完善。

```
(async () => {
    const fetchData = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    const [err, data] = await fetchData().then(data => [null, data] ).catch(err => [err, null])
    console.log('err', err)
    console.log('data', data)
    // err null
    // data fetch data is me
})()
复制代码
```

这样是不是好很多了呢，但是问题又来了，不能每个 await 都写这么长，写着也不方便也不优雅，再优化一下

```
(async () => {
    const fetchData = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    // 抽离成公共方法
    const awaitWrap = (promise) => {
        return promise
            .then(data => [null, data])
            .catch(err => [err, null])
    }

    const [err, data] = await awaitWrap(fetchData())
    console.log('err', err)
    console.log('data', data)
    // err null
    // data fetch data is me
})()
复制代码
```

将对 `await` 处理的方法抽离成公共的方法，在使用 `await` 调用 `awaitWrap` 这样的方法是不是更优雅了呢。如果使用 typescript 实现大概是这个样子

```
function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}
复制代码
```

以上。

作者：Vincent.W

链接：https://juejin.im/post/5c49eb28f265da613a545a4b

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。