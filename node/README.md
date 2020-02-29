# Node基础篇

[toc]



## 最简短的开场白

### Node是什么

- 用于编写服务器端应用

- JavaScript核心语法

- 只是操作的对象不同

  | 前端 | DOM                  | 文档对象   |
  | ---- | -------------------- | ---------- |
  |      | BOM/DOM              | 浏览器对象 |
  |      | XMLHttpRequest/fetch | 网络通讯   |
  | 后端 | os                   | 操作系统   |
  |      | process              | 进程       |
  |      | fs                   | 文件系统   |
  |      | net                  | 网络通讯   |

### API哪里找

英文 https://nodejs.org/dist/latest-v10.x/docs/api/

中文 http://nodejs.cn/api/

### 

## 运行/调试/模块 - 如何搭建万里长城

### Helloworld

```js
console.log('hello world')
```

### bash运行

```bash
node helloworld/index.js
# 或
node helloworld
```

### Nodemon自动重启

监视代码修改，自动重启

```bash
npm i nodemon -g
nodemon helloworld
```

### Vscode调试debug

### 单元测试Jest

#### 安装jest库

```
npm install jest -g
```

在\_\__tests\_\__文件夹中创建index.spec.ts

```js
test("Hello world", () => {
    require('../index')
});

```

运行

```bash
jest helloworld
```



### Exports与Require

```js
const str = 'helloworld'
// module.exports = str
// 或
// module.exports.str = str
// 或
exports.str = str
```

测试程序

```js
it('测试Export', () => {
    const string = require('../index')
    console.log('export', string)
})

```

### 测试代码生成工具

>- 掌握fs中的同步方法
>
>- path包

### 生成测试文件名

```js
test('测试文件名称',() => {
    const src = new (require('../index'))()
    const ret = src.getTestFileName('/abc/class.js')
    console.log('getSourceName',ret)
    expect(ret)
    .toBe('/abc/__test__/class.spec.js')
})
```



```js
const path = require('path')
module.exports = class TestNow {
		/**
     * 生成测试文件名
     * @param {*} filename 
     */
    getTestFileName(filename) {
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename)
        const extname = path.extname(filename)
        const testName = baseName.replace(extname, `.spec${extname}`)

        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }
}
```



#### 生成测试代码

```js
test('生成测试代码', () => {
    const src = new (require('../index'))()
    const ret = src.getTestSource('fun','class')
    expect(ret)
        .toBe(
            `
test('TEST fun',() => {
    const  fun = require('../class')
    const ret = fun()
    // expect(ret)
    //     .toBe('test ret')
})
        `
        )
})
```







## 事件/异步 - 如何控制好异步过程

### callback

### setTimeout

### gennerator

### async/await

### eventEmmiter/订阅发布机制

### eventEimitter源码

### promisify



## IO处理

### 同步与异步读取文件

> 补充资料 https://nodejs.org/dist/latest-v10.x/docs/api/fs.html

| fs 方法      | 描述                                                       |
| :----------- | :--------------------------------------------------------- |
| fs.truncate  | 截断或者拓展文件到制定的长度                               |
| fs.ftruncate | 和 truncate 一样，但将文件描述符作为参数                   |
| fs.chown     | 改变文件的所有者以及组                                     |
| fs.fchown    | 和 chown 一样，但将文件描述符作为参数                      |
| fs.lchown    | 和 chown 一样，但不解析符号链接                            |
| fs.stat      | 获取文件状态                                               |
| fs.lstat     | 和 stat 一样，但是返回信息是关于符号链接而不是它指向的内容 |
| fs.fstat     | 和 stat 一样，但将文件描述符作为参数                       |
| fs.link      | 创建一个硬链接                                             |
| fs.symlink   | 创建一个软连接                                             |
| fs.readlink  | 读取一个软连接的值                                         |
| fs.realpath  | 返回规范的绝对路径名                                       |
| fs.unlink    | 删除文件                                                   |
| fs.rmdir     | 删除文件目录                                               |
| fs.mkdir     | 创建文件目录                                               |
| fs.readdir   | 读取一个文件目录的内容                                     |
| fs.close     | 关闭一个文件描述符                                         |
| fs.open      | 打开或者创建一个文件用来读取或者写入                       |
| fs.utimes    | 设置文件的读取和修改时间                                   |
| fs.futimes   | 和 utimes 一样，但将文件描述符作为参数                     |
| fs.fsync     | 同步磁盘中的文件数据                                       |
| fs.write     | 写入数据到一个文件                                         |
| fs.read      | 读取一个文件的数据                                         |

### Promisify



### buffer -  操作二进制数据

### 生成Base64编码

```
exports.imageUrl = () => {
    const mime = 'image/png'
    const encoding = 'base64'
    const base64Data = fs.readFileSync(`${__dirname}/image.png`).toString(encoding)
    const uri = `data:${mime};${encoding},${base64Data}`
    // data:image/png;base64,
    fs.writeFileSync(`${__dirname}/index.html`,`<img src='${uri}' />`)
    // console.log(uri)
}
```



### stream - 流的操作

流是基于事件的 API，用于管理和处理数据。

- 流是能够读写的
- 是基于事件实现的一个实例

理解流的最好方式就是想象一下没有流的时候怎么处理数据：

- `fs.readFileSync` 同步读取文件，程序会阻塞，所有数据被读到内存
- `fs.readFile` 阻止程序阻塞，但仍会将文件所有数据读取到内存中
- 希望少内存读取大文件，读取一个数据块到内存处理完再去索取更多的数据

## 进程/子进程

process



```js
// 查看PATH
console.log(process.env.PATH.split(':').join('\n'));
console.log(`arch:${process.arch}`)
console.log(`platform:${process.platform}`)
console.log(`获取内存使用情况 memoryUsage:${process.memoryUsage()}`)
console.log(`获取命令行参数 argv:${process.argv}`)
```





#### 自动重启工具（Nodemon）

```js
const fs = require('fs')
const { spawn } = require('child_process')
const { resolve } = require('path')
function watch() {
    const [cmd, , source, ...argv] = process.argv
    // console.log('abc', cmd, source, argv)
    const childProcess = spawn(cmd, [source, ...argv])
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    const watcher = fs.watch(resolve(__dirname, source), () => {
        console.log('File changed, reloading.')
        childProcess.kill()
        watcher.close()
        watch()
    })
}
watch()


```

























