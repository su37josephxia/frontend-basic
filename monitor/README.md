# 前端异常监控系统(Vue + Webpack + Node.js + Egg.js + Jest)

## 您将Get的技能

- 收集前端错误（原生、React、Vue）
- 编写错误上报逻辑
- 利用Egg.js编写一个错误日志采集服务
- 编写webpack插件自动上传sourcemap
- 利用sourcemap还原压缩代码源码位置
- 利用Jest进行单元测试



## 工作流程

1. 收集错误
2. 上报错误
3. 代码上线打包将sourcemap文件上传至错误监控服务器
4. 发生错误时监控服务器接收错误并记录到日志中
5. 根据sourcemap和错误日志内容进行错误分析



## 异常收集

首先先看看如何捕获异常。

### JS异常

js异常的特点是,出现不会导致JS引擎崩溃 最多只会终止当前执行的任务。比如一个页面有两个按钮，如果点击按钮发生异常页面，这个时候页面不会崩溃，只是这个按钮的功能失效，其他按钮还会有效。



```js
setTimeout(() => {
  console.log('1->begin')
  error
  console.log('1->end')
})
setTimeout(() => {
  console.log('2->begin')
  console.log('2->end')
})
```



![image-20200205170222376](./assets/image-20200205170222376.png)

上面的例子我们用setTimeout分别启动了两个任务，虽然第一个任务执行了一个错误的方法。程序执行停止了。但是另外一个任务并没有收到影响。



其实如果你不打开控制台都看不到发生了错误。好像是错误是在静默中发生的。

下面我们来看看这样的错误该如何收集。

#### try-catch

JS作为一门高级语言我们首先想到的使用try-catch来收集。

```js
setTimeout(() => {
  try {
    console.log('1->begin')
    error
    console.log('1->end')
  } catch (e) {
    console.log('catch',e)
  }
})
```

![image-20200205172234075](./assets/image-20200205172234075.png)

如果在函数中错误没有被捕获，错误会上抛。

```js
function fun1() {
  console.log('1->begin')
  error
  console.log('1->end')
}
setTimeout(() => {
  try {
    fun1()
  } catch (e) {
    console.log('catch',e)
  }
})
```

![image-20200205173058230](./assets/image-20200205173058230.png)控制台中打印出的分别是错误信息和错误堆栈。



读到这里大家可能会想那就在最底层做一个错误try-catch不就好了吗。确实作为一个从java转过来的程序员也是这么想的。但是理想很丰满，现实很骨感。我们看看下一个例子。

```js
function fun1() {
  console.log('1->begin')
  error
  console.log('1->end')
}

try {
  setTimeout(() => {
    fun1()

  })
} catch (e) {
  console.log('catch', e)
}
```

![image-20200205173548456](./assets/image-20200205173548456.png)

大家注意运行结果，异常并没有被捕获。

这是因为JS的try-catch功能非常有限一遇到异步就不好用了。那总不能为了收集错误给所有的异步都加一个try-catch吧，太坑爹了。其实你想想异步任务其实也不是由代码形式上的上层调用的就比如本例中的settimeout。大家想想eventloop就明白啦，其实这些一步函数都是就好比一群没娘的孩子出了错误找不到家大人。当然我也想过一些黑魔法来处理这个问题比如代理执行或者用过的异步方法。算了还是还是再看看吧。



#### window.onerror

window.onerror 最大的好处就是可以同步任务还是异步任务都可捕获。

```js
function fun1() {
  console.log('1->begin')
  error
  console.log('1->end')
}
window.onerror = (...args) => {
  console.log('onerror:',args)
}

setTimeout(() => {
  fun1()
})
```

![image-20200205175601033](./assets/image-20200205175601033.png)

- onerror返回值

  onerror还有一个问题大家要注意 如果返回返回true 就不会被上抛了。不然控制台中还会看到错误日志。



#### 监听error事件 

> window.addEventListener('error',() => {}）

其实onerror固然好但是还是有一类异常无法捕获。这就是网络异常的错误。比如下面的例子。

```html
<img src="./xxxxx.png">
```

试想一下我们如果页面上要显示的图片突然不显示了，而我们浑然不知那就是麻烦了。

addEventListener就是

```js
window.addEventListener('error', args => {
    console.log(
      'error event:', args
    );
    return true;
  }, 
  true // 利用捕获方式
);
```

运行结果如下：

![image-20200206102602184](./assets/image-20200206102602184.png)



#### Promise异常捕获

Promise的出现主要是为了让我们解决回调地域问题。基本是我们程序开发的标配了。虽然我们提倡使用es7 async/await语法来写，但是不排除很多祖传代码还是存在Promise写法。

```js
new Promise((resolve, reject) => {
  abcxxx()
});
```

这种情况无论是onerror还是监听错误事件都是无法捕获的

```js
new Promise((resolve, reject) => {
  error()
})
// 增加异常捕获
  .catch((err) => {
  console.log('promise catch:',err)
});
```

除非每个Promise都添加一个catch方法。但是显然是不能这样做。

```js
window.addEventListener("unhandledrejection", e => {
  console.log('unhandledrejection',e)
});
```



![image-20200206111017073](./assets/image-20200206111017073.png)



我们可以考虑将unhandledrejection事件捕获错误抛出交由错误事件统一处理就可以了

```js
window.addEventListener("unhandledrejection", e => {
  throw e.reason
});
```



#### async/await异常捕获

```js
const asyncFunc = () => new Promise(resolve => {
  error
})
setTimeout(async() => {
  try {
    await asyncFun()
  } catch (e) {
    console.log('catch:',e)
  }
})
```

实际上async/await语法本质还是Promise语法。区别就是async方法可以被上层的try/catch捕获。

![image-20200206113325907](./assets/image-20200206113325907.png)

如果不去捕获的话就会和Promise一样，需要用unhandledrejection事件捕获。这样的话我们只需要在全局增加unhandlerejection就好了。



![image-20200206112730746](./assets/image-20200206112730746.png)

#### 小结

| 异常类型                   | 同步方法 | 异步方法 | 资源加载 | Promise | async/await |
| -------------------------- | -------- | -------- | -------- | ------- | ----------- |
| try/catch                  | ✔️        |          |          |         | ✔️           |
| onerror                    | ✔️        | ✔️        |          |         |             |
| error事件监听              | ✔️        | ✔️        | ✔️        |         |             |
| unhandledrejection事件监听 |          |          |          | ✔️       | ✔️           |

实际上我们可以将unhandledrejection事件抛出的异常再次抛出就可以统一通过error事件进行处理了。

最终用代码表示如下：

```js
window.addEventListener("unhandledrejection", e => {
  throw e.reason
});
window.addEventListener('error', args => {
  console.log(
    'error event:', args
  );
  return true;
}, true);
```

### Webpack工程化

现在是前端工程化的时代,工程化导出的代码一般都是被压缩混淆后的。

比如：

```js
setTimeout(() => {
    xxx(1223)
}, 1000)
```

![image-20200207154545464](./assets/image-20200207154545464.png)

出错的代码指向被压缩后的JS文件，而JS文件长下图这个样子。

![image-20200207154708908](./assets/image-20200207154708908.png)

如果想将错误和原有的代码关联起来就需要sourcemap文件的帮忙了。

#### sourceMap是什么

简单说，`sourceMap`就是一个文件，里面储存着位置信息。

仔细点说，这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。

那么如何利用sourceMap对还原异常代码发生的位置这个问题我们到异常分析这个章节再讲。



### Vue

#### 创建工程

利用vue-cli工具直接创建一个项目。

```js
# 安装vue-cli
npm install -g @vue/cli

# 创建一个项目
vue create vue-sample

cd vue-sample
npm i
// 启动应用
npm run serve

```

为了测试的需要我们暂时关闭eslint 这里面还是建议大家全程打开eslint

在vue.config.js进行配置

```js
module.exports = {   
  // 关闭eslint规则
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave:false
}
```



我们故意在src/components/HelloWorld.vue
```html
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    // 制造一个错误
    abc()
  }
};
</script>
​```html

然后在src/main.js中添加错误事件监听

​```js
window.addEventListener('error', args => {
  console.log('error', error)
})
```

这个时候 错误会在控制台中被打印出来,但是错误事件并没有监听到。

![image-20200207165626482](./assets/image-20200207165626482.png)



#### handleError

为了对Vue发生的异常进行统一的上报，需要利用vue提供的handleError句柄。一旦Vue发生异常都会调用这个方法。

我们在src/main.js

```js
Vue.config.errorHandler = function (err, vm, info) {
  console.log('errorHandle:', err)
}
```

运行结果结果：

![image-20200207171558588](./assets/image-20200207171558588.png)

### React

```js
npx create-react-app react-sample
cd react-sample
yarn start

```

我们l用useEffect hooks 制造一个错误

```js
import React ,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {	
    // 发生异常
    error()
  });	

  return (
    <div className="App">
      // ...略...
    </div>
  );
}

export default App;

```

并且在src/index.js中增加错误事件监听逻辑

```
window.addEventListener('error', args => {
    console.log('error', error)
})
```

但是从运行结果看虽然输出了错误日志但是还是服务捕获。

![image-20200207183546189](assets/image-20200207183546189.png)

#### 

#### ErrorBoundary标签

**错误边界仅可以捕获其子组件的错误**。错误边界无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。这也类似于 JavaScript 中 catch {} 的工作机制。



创建ErrorBoundary组件

```js
import React from 'react'; 
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentDidCatch(error, info) {
      // 发生异常时打印错误
      console.log('componentDidCatch',error)
    }
  
    render() {
      return this.props.children;
    }
  }
```



在src/index.js中包裹App标签

```js
import ErrorBoundary from './ErrorBoundary'

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
    , document.getElementById('root'));
```



最终运行的结果

![image-20200207185123353](assets/image-20200207185123353.png)



### 跨域代码异常

(待...)

### IFrame异常

(待...)




## 异常上报

### 选择通讯方式

#### 动态创建img标签

其实上报就是要将捕获的异常信息发送到后端。最常用的方式首推动态创建标签方式。因为这种方式无需加载任何通讯库，而且页面是无需刷新的。基本上目前包括百度统计 Google统计都是基于这个原理做的埋点。

```js
new Image().src = 'http://localhost:7001/monitor/error'+ '?info=xxxxxx'
```

![image-20200206124035097](./assets/image-20200206124035097.png)

通过动态创建一个img,浏览器就会向服务器发送get请求。可以把你需要上报的错误数据放在querystring字符串中，利用这种方式就可以将错误上报到服务器了。

#### Ajax上报

实际上我们也可以用ajax的方式上报错误，这和我们再业务程序中并没有什么区别。在这里就不赘述。



### 上报哪些数据

![image-20200206150411524](./assets/image-20200206150411524.png)

我们先看一下error事件参数：


| 属性名称 | 含义          | 类型   |
| -------- | ------------- | ------ |
| message  | 错误信息      | string |
| filename | 异常的资源url | string |
| lineno   | 异常行号      | int    |
| colno    | 异常列号      | int    |
| error    | 错误对象      | object |
| error.message    | 错误信息      |  string |
| error.stack    | 错误信息      |  string      |



其中核心的应该是错误栈，其实我们定位错误最主要的就是错误栈。

错误堆栈中包含了绝大多数调试有关的信息。其中包括了异常位置（行号，列号），异常信息

有兴趣的同学可以看看这篇文章

>https://github.com/dwqs/blog/issues/49



### 上报数据序列化

由于通讯的时候只能以字符串方式传输，我们需要将对象进行序列化处理。

大概分成以下三步：

- 将异常数据从属性中解构出来存入一个JSON对象

- 将JSON对象转换为字符串

- 将字符串转换为Base64

当然在后端也要做对应的反向操作 这个我们后面再说。

```js

window.addEventListener('error', args => {
  console.log(
    'error event:', args
  );
  uploadError(args)
  return true;
}, true);
function uploadError({
    lineno,
    colno,
    error: {
      stack
    },
    timeStamp,
    message,
    filename
  }) {
    // 过滤
    const info = {
      lineno,
      colno,
      stack,
      timeStamp,
      message,
      filename
    }
    // const str = new Buffer(JSON.stringify(info)).toString("base64");
  	const str = window.btoa(JSON.stringify(info))
    const host = 'http://localhost:7001/monitor/error'
    new Image().src = `${host}?info=${str}`
}
```



## 异常收集

异常上报的数据一定是要有一个后端服务接收才可以。

我们就以比较流行的开源框架eggjs为例来演示

### 搭建eggjs工程

```js
# 全局安装egg-cli
npm i egg-init -g 
# 创建后端项目
egg-init backend --type=simple
cd backend
npm i
# 启动项目
npm run dev
```

### 编写error上传接口

首先在app/router.js添加一个新的路由

```js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 创建一个新的路由
  router.get('/monitor/error', controller.monitor.index);
};
```

创建一个新的controller (app/controller/monitor)

```js
'use strict';

const Controller = require('egg').Controller;
const { getOriginSource } = require('../utils/sourcemap')
const fs = require('fs')
const path = require('path')

class MonitorController extends Controller {
  async index() {
    const { ctx } = this;
    const { info } = ctx.query
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('fronterror:', json)
    ctx.body = '';
  }
}

module.exports = MonitorController;

```

![image-20200206163420155](./assets/image-20200206163420155.png)

看一下接收后的结果



### 记入日志文件

下一步就是讲错误记入日志。实现的方法可以自己用fs写，也可以借助log4js这样成熟的日志库。

当然在eggjs中是支持我们定制日志那么我么你就用这个功能定制一个前端错误日志好了。

在/config/config.default.js中增加一个定制日志配置

```js
// 定义前端错误日志
config.customLogger = {
  frontendLogger : {
    file: path.join(appInfo.root, 'logs/frontend.log')
  }
}
```

在/app/controller/monitor.js中添加日志记录

```js
async index() {
    const { ctx } = this;
    const { info } = ctx.query
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('fronterror:', json)
    // 记入错误日志
    this.ctx.getLogger('frontendLogger').error(json)
    ctx.body = '';
  }
```

最后实现的效果

![image-20200206171529549](./assets/image-20200206171529549.png)







## 异常分析

谈到异常分析最重要的工作其实是将webpack混淆压缩的代码还原。



### Webpack插件实现SourceMap上传

在webpack的打包时会产生sourcemap文件，这个文件需要上传到异常监控服务器。这个功能我们试用webpack插件完成。

#### 创建webpack插件

/source-map/plugin

```js
const fs = require('fs')
var http = require('http');

class UploadSourceMapWebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // 打包结束后执行
    compiler.hooks.done.tap("upload-sourcemap-plugin", status => {
      console.log('webpack runing')
    });
  }
}

module.exports = UploadSourceMapWebpackPlugin;

```

#### 加载webpack插件

webpack.config.js

```js
// 自动上传Map
UploadSourceMapWebpackPlugin = require('./plugin/uploadSourceMapWebPackPlugin')

plugins: [
    // 添加自动上传插件
    new UploadSourceMapWebpackPlugin({
      uploadUrl:'http://localhost:7001/monitor/sourcemap',
      apiKey: 'kaikeba'
    })
  ],

```

#### 添加读取sourcemap读取逻辑

在apply函数中增加读取sourcemap文件的逻辑

/plugin/uploadSourceMapWebPlugin.js

```js
apply(compiler) {
    // 打包结束后执行
    compiler.hooks.done.tap("upload-sourcemap-plugin", status => {
      // 获取输出文件目录
      const path = status.compilation.outputOptions.path
      const sourceMapFileIncludes = [/\.map$/, /asset-manifest\.json/];
      // 读取sourcemap文件
      const list = fs.readdirSync(path)
      list
        .filter(file => sourceMapFileIncludes.some(regex => regex.test(file)))
        .forEach(fileName => {
          console.log('file', fileName)
          this.upload(this.options.uploadUrl, path, fileName)
        })
    });
  }
```

#### 实现http上传功能

```js
upload(url, dir, file, apiKey) {
    const client = http.request(
      `${url}?name=${file}&key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-strean",
        }
      }
    )
    const stream = fs.createReadStream(`${dir}/${file}`)
    stream.pipe(client)
    stream.on('end', () => {
      client.end()
    })
    client.on('error', () => {
      console.log('source-map上传失败')
    })
  }
```

#### 服务器端添加上传接口

/backend/app/router.js

```js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/monitor/error', controller.monitor.index);
  // 添加上传路由
 router.post('/monitor/sourcemap',controller.monitor.upload)
};
    
```

添加sourcemap上传接口

/backend/app/controller/monitor.js

```js
async upload() {
    const { ctx } = this
    const stream = ctx.req
    const filename = ctx.query.name
    const dir = path.join(this.config.baseDir, 'uploads')
    // 判断upload目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const target = path.join(dir, filename)
    const writeStream = fs.createWriteStream(target)
    stream.pipe(writeStream)
}
```

最终效果：

执行webpack打包时调用插件sourcemap被上传至服务器。

![image-20200206202732716](./assets/image-20200206202732716.png)



### 解析ErrorStack

考虑到这个功能需要较多逻辑,我们准备把他开发成一个独立的函数并且用Jest来做单元测试

先看一下我们的需求



| 输入 | stack(错误栈) | ReferenceError: xxx is not defined\n' +     '  at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392' |
| ---- | ------------- | ------------------------------------------------------------ |
|      | SourceMap     | 略                                                           |
| 输出 | 源码错误栈    | {       source: 'webpack:///src/index.js',       line: 24,       column: 4,       name: 'xxx'     } |



搭建Jest框架

![image-20200207113234836](./assets/image-20200207113234836.png)



首先创建一个/utils/stackparser.js文件

```js
module.exports = class StackPaser {
    constructor(sourceMapDir) {
        this.consumers = {}
        this.sourceMapDir = sourceMapDir
    }
}

```

在同级目录下创建测试文件stackparser.spec.js

以上需求我们用Jest表示就是

```js
const StackParser = require('../stackparser')
const { resolve } = require('path')
const error = {
    stack: 'ReferenceError: xxx is not defined\n' +
        '    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392',
    message: 'Uncaught ReferenceError: xxx is not defined',
    filename: 'http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js'
}

it('stackparser on-the-fly', async () => {

    const stackParser = new StackParser(__dirname)

    // 断言 
    expect(originStack[0]).toMatchObject(
        {
            source: 'webpack:///src/index.js',
            line: 24,
            column: 4,
            name: 'xxx'
        }
    )
})

```

整理如下:

下面我们运行Jest

```js
npx jest stackparser --watch
```

![image-20200207114208691](./assets/image-20200207114208691.png)

显示运行失败，原因很简单因为我们还没有实现对吧。下面我们就实现一下这个方法。

#### 反序列Error对象

首先创建一个新的Error对象 将错误栈设置到Error中，然后利用error-stack-parser这个npm库来转化为stackFrame

```js
const ErrorStackParser = require('error-stack-parser')
/**
 * 错误堆栈反序列化
 * @param {*} stack 错误堆栈
 */
parseStackTrack(stack, message) {
  const error = new Error(message)
  error.stack = stack
  const stackFrame = ErrorStackParser.parse(error)
  return stackFrame
}
```

运行效果

![image-20200207115955932](./assets/image-20200207115955932.png)

#### 解析ErrorStack

下一步我们将错误栈中的代码位置转换为源码位置

```js
const { SourceMapConsumer } = require("source-map");
async getOriginalErrorStack(stackFrame) {
        const origin = []
        for (let v of stackFrame) {
            origin.push(await this.getOriginPosition(v))
        }

        // 销毁所有consumers
        Object.keys(this.consumers).forEach(key => {
            console.log('key:',key)
            this.consumers[key].destroy()
        })
        return origin
    }

    async getOriginPosition(stackFrame) {
        let { columnNumber, lineNumber, fileName } = stackFrame
        fileName = path.basename(fileName)
        console.log('filebasename',fileName)
        // 判断是否存在
        let consumer = this.consumers[fileName]

        if (consumer === undefined) {
            // 读取sourcemap
            const sourceMapPath = path.resolve(this.sourceMapDir, fileName + '.map')
            // 判断目录是否存在
            if(!fs.existsSync(sourceMapPath)){
                return stackFrame
            }
            const content = fs.readFileSync(sourceMapPath, 'utf8')
            consumer = await new SourceMapConsumer(content, null);
            this.consumers[fileName] = consumer
        }
        const parseData = consumer.originalPositionFor({ line:lineNumber, column:columnNumber })
        return parseData
    }
```

我们用Jest测试一下

```js
it('stackparser on-the-fly', async () => {

    const stackParser = new StackParser(__dirname)
    console.log('Stack:',error.stack)
    const stackFrame = stackParser.parseStackTrack(error.stack, error.message)
    stackFrame.map(v => {
        console.log('stackFrame', v)
    })
    const originStack = await stackParser.getOriginalErrorStack(stackFrame)

    // 断言 
    expect(originStack[0]).toMatchObject(
        {
            source: 'webpack:///src/index.js',
            line: 24,
            column: 4,
            name: 'xxx'
        }
    )
})
```

![image-20200207120534213](./assets/image-20200207120534213.png)

看一下结果测试通过。

#### 将源码位置记入日志

```js
async index() {
    console.log
    const { ctx } = this;
    const { info } = ctx.query
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('fronterror:', json)
    
    // 转换为源码位置
    const stackParser = new StackParser(path.join(this.config.baseDir, 'uploads'))
    const stackFrame = stackParser.parseStackTrack(json.stack, json.message)
    const originStack = await stackParser.getOriginalErrorStack(stackFrame)
    this.ctx.getLogger('frontendLogger').error(json,originStack)
    
    ctx.body = '';
  }
```



运行效果:

![image-20200207122613284](./assets/image-20200207122613284.png)



## 开源框架

### Fundebug

[Fundebug](https://www.fundebug.com/)专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java线上应用实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了10亿+错误事件，付费客户有阳光保险、荔枝FM、掌门1对1、核桃编程、微脉等众多品牌企业。欢迎免费试用！

### Sentry

Sentry 是一个开源的实时错误追踪系统，可以帮助开发者实时监控并修复异常问题。它主要专注于持续集成、提高效率并且提升用户体验。Sentry 分为服务端和客户端 SDK，前者可以直接使用它家提供的在线服务，也可以本地自行搭建；后者提供了对多种主流语言和框架的支持，包括 React、Angular、Node、Django、RoR、PHP、Laravel、Android、.NET、JAVA 等。同时它可提供了和其他流行服务集成的方案，例如 GitHub、GitLab、bitbuck、heroku、slack、Trello 等。目前公司的项目也都在逐步应用上 Sentry 进行错误日志管理。





# 总结