# Node.js葵花宝典

## 前言

​           欲练此功，必先自宫；

​           不必自宫，亦可练成；

​           兄台还是好好修炼此功吧！保持一个清醒的头脑，你将驾驭这匹野马！！！

——    致读者

​           知识就像海洋一样，永远也学不完，但是不断精益求精是一种态度，是对新事物的一种持续保持瞻望的态度，但愿你在学习的乐园里不断完善己身，不断修炼，等待破茧成蝶。

## 文档风格

- 书名采用 `#`
- 大标题采用`##`
- 单元小结标题采用`####`

​    ——  致开发者

​           好的书写风格能够让读者的思路清晰，同样能让人有继续阅读的兴趣，但愿你能按照此风格继续完善本书籍。

## 第一篇  为何偏爱Node.js

#### 1.1 引子

- 前端职责范围变大，为了统一流程开发体验
- 在处理高并发，I/O密集型场景性能优势足够明显

#### 1.2 CPU密集 ==VS== IO密集

- CPU密集：压缩、解压、加密、解密
- I/O密集：文件操作、网络操作、数据库

#### 1.3 Web常见的场景

- 静态资源获取
- ......

#### 1.4 高并发对应之道

- 增加物理机的个数
- 增加每台机器的CPU数------多核

#### 1.5 关于进程线程那些事儿

- 进程：用一句比较接地气的一句话叙述就是，执行中的程序就叫做进程。
- 多进程：启动多个进程处理一个任务。
- 线程：进程内一个相对独立、可以调度的执行单元，与同属一个进程的线程共享进程资源。

#### 1.6 再来谈谈Node.js的单线程

- 单线程只是针对主进程，I/O操作系统底层进行多线程调度。也就是它仅仅起一个监听作用。

  ```
  ###  举个栗子叭
       场景：饭店
       情节：人流量高并发
       BOSS的策略：雇佣多名厨师，只雇佣一个服务员，当多名顾客点餐的时候，服务员告诉厨师，做菜，上菜。
  复制代码
  ```

- 单线程并不是只开一个进程。

  ```
  ###  Node.js中的cluster（集群）模块
       官方介绍：单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。
       Demo：
  const cluster = require('cluster');
  const http = require('http');
  const numCPUs = require('os').cpus().length;
  
  if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);
  
    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
  } else {
    // 工作进程可以共享任何 TCP 连接。
    // 在本例子中，共享的是 HTTP 服务器。
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end('你好世界\n');
    }).listen(8000);
  
    console.log(`工作进程 ${process.pid} 已启动`);
  }
  复制代码
  ```

- 友情链接[Cluster](https://link.juejin.im?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fcluster.html)

#### 1.7 Node.js的常用场景

- Web server
- 本地代码构建

## 第二篇 环境&调试

#### 2.1 环境安装

- 移步[官网](https://link.juejin.im?target=nodejs.cn)

#### 2.2 环境必须

- CommonJS

  - 每个文件都是一个模块，有自己的作用域。（它会自动包裹函数）

  - 在模块内部`module`变量代表模块本身。

  - `module.exports`属性代表模块对外接口。

    `ModuleDemo.js`

    ```
    console.log('this is a module');
    
    const testVar = 100;
    
    function test () {
        console.log(testVar);
    }
    
    module.exports.testVar = testVar;
    module.exports.testFn = test;
    复制代码
    ```

  - `使用模块之require规则`

  ​          -    `/`表示绝对路径，`./`表示相对于当前文件的路径。

  ​          -  支持`js`、`json`、`node`拓展名

  ​          -   不写路径则认为是`build-in`模块或者各级`node-modules`内的第三方模块

  `CommonJS Use Module`

  ```
  const modu = require('ModuleDemo.js');
  
  console.log(modu.testVar);
  
  console.log(modu.test);
  复制代码
  ```

  - ```
    require特性
    ```

    - module被加载的时候执行，加载后缓存。（后边这一句的意义就是，只加载一次，加载完缓存）【注：可以做一个小test，在一个test文件中，同时加载两次模块，你就会发现其中的奥秘了。】
    - 一旦出现某个模块被循环加载，就只会输出已经执行的部分，还未执行的部分不会输出。

- Global

- Process

#### 2.3 Node.js引用系统模块与第三方模块

- 引用系统模块

  ```
  const fs = require('fs');
  
  const result = fs.readFile('fs.js',( err, data) => {
      if (err) {
          return err;
      }
      
      console.log(data);
  });
  
  console.log(result);
  
  复制代码
  ```

- 引用第三方模块

  ```
  npm i chalk -S
  复制代码
  ```

  ```
  const chalk = require('chalk');
  复制代码
  ```

#### 2.4 exports与module.exports

```
{
    function(exports,require,module,__filename,__dirname) {
        // code
    }
}
复制代码
```

- 简而言之，exports就是module.exports的一个简写，也就是一个引用，别名。

  ```
  exports = {
      a: 1,
      b: 2,
      test: 123
  }
  //这样是错误的
  exports.test = 100；
  //只能添加属性，但是不能修改其指向
  
  //当然
  module.exports = {
      a:1,
      b:2,
      test:123,
  }
  //这样是没问题的
  复制代码
  ```

#### 2.5 Global对象

- CommonJS
- Buffer、process、console
- timer

```
global.test = 200;
复制代码
```

#### 2.6 process模块

```
/**
 *  argv
 *  argv0 
 *  execArgv
 *  execPath
 */

const {argv, argv0, execArgv, execPath} = require('process');

argv.forEach( item => {
    console.log(item);
})

//打印当前工作进程的路径

console.log(process.cwd());

//setImmediate(fn),不需要任何时间参数，执行最慢
//process.nextTick(fn)
//二者的区别就是后者的执行会先于前者



复制代码
```

- 简单说明一下，就是`process.nextTick()`会把任务放在当前事件循环队列的队尾，而`setImmediate()`会把任务放在下一个队列的队首，而`setTimeout()`会把任务放在它俩中间。

#### 2.7 Debug

- [Inspector](https://link.juejin.im?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Finspector.html)
- IDE进行调试

## 第三篇  Node.js-API

#### 3.1 path

和路径有关的内置模块

- `path.basename()`取得一个路径的最后一部分文件名

- `path.normalize()`帮助修正路径

- `path.join()`用于路径拼接（参数为多个路径参数）

- `path.resolve()`将一个相对路径解析为绝对路径

- ```
  {basename, dirname, extname}
  ```

  - `basename` 完整名
  - `dirname` 上级路径名
  - `extname` 后缀名

- ```
  {parse, format}
  ```

  - `parse`用于解析当前路径为一个json格式的数据
  - `format`相当于格式化json数据为一个字符串

说明：`__dirname`、`__filename`总是返回文件的绝对路径

​             `process.cwd()`总是返回node命令所在文件夹

#### 3.2 Buffer

三个要点：

- Buffer用于处理二进制数据流
- 实例类似整数数组，大小固定
- C++代码在V8堆外分配物理内存

Buffer常用的方法

- `byteLength`统计buffer所占字节数
- `isBuffer`用来判断目标数据是不是一个Buffer
- `concat`合并连接Buffer
- `from`将目标数据转换为Buffer
- `toString`用来转换Buffer为字符串

#### 3.3 events

- `eventEmitter.on('eventName',callback())`用于注册监听器
- `eventEmitter.emit('eventName')`用于触发事件

```
const EventEmitter = require('events');

class CustomEvent extends EventEmitter {
    
}

const ce = new CustomEvent();

ce.on('eventName',callback);

ce.emit('eventName','your msg to eventEmit',....);

//有一个通用参数就叫error

ce.on('error',fn);

//Example
ce.on('error',(err, item) => {
    console.log(err);
    console.log(item);
});

ce.emit('error', new Error('出错了'), Date().now);
复制代码
```

针对事件只需要响应一次：

```
ce.once('test', ()=> {
    console.log(test);
});


复制代码
```

针对事件需要移除的话：

```
ce.removeListener('eventName',fn);

//or

ce.removeAllListeners('test');
复制代码
```

#### 3.4 fs

​    首先需要注意的就是Node.js的设计模型就是错误优先的模式。

```
fs.readFile('fileUrl', 'utf8', (err, data) => {
    if(err) throw err;
    
    console.log(data);
})
复制代码
```

- `stat()`查看文件的详细信息

  ```
  const fs = require('fs');
  
  fs.stat('fileUrl', (err, data) => {
      if (err) {
          throw err;//这里可以判断文件是否存在
      }
      
      console.log(data);
  });
  复制代码
  ```

- `rename()`更改文件名

  ```
  fs.rename('./text.txt','hahah.ttx');
  复制代码
  ```

- `unlink`删除文件

```
fs.unlink('fileName', err => err);
复制代码
```

- `readdir()`读取文件夹
- `mkdir()`创建文件夹
- `rmdir()`删除文件夹
- `watch()`监视文件或目录的变化

```
fs.watch('fileUrl', {
    recursive:true //是否监视子文件夹
}, (eventType, fileName) => {
    console.log(eventType, fileName);
})
复制代码
```

- `readStream()`读取流

```
const rs = fs.createReadStream('urlPath');

rs.pipe(process.stdout);//导出文件到控制台
复制代码
```

- `writeStream()`写入流

- `pipe()`管道，导通流文件

  ```
  const ws  = fscreateWriteStream('urlPath');
  
  ws.write('some content');
  
  ws.end();
  
  ws.on('finish',()=>{
     console.log('done!!!'); 
  });
  复制代码
  ```

## 第四篇  项目Init

#### 4.1 `.gitignore`

- 匹配模式前`/`代表项目根目录
- 匹配模式最后加`\`代表是目录
- 匹配模式前加`!`代表取反
- `*`代表任意一个字符
- `?`匹配任意字符
- `**`匹配任意目录

#### 4.2 `ESLint`

完整配置`.eslintrc.js`

```
module.exports = {
    env: {
        es6: true,
        mocha: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:sort-class-members/recommended'],
    parser: 'babel-eslint',
    plugins: ['babel', 'sort-class-members'],
    root: true,
    rules: {
        'accessor-pairs': 'error', // 强制 getter 和 setter 在对象中成对出现
        'array-bracket-spacing': 'off', // 强制数组方括号中使用一致的空格
        'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号
        'arrow-spacing': 'error', // 强制箭头函数的箭头前后使用一致的空格
        'babel/arrow-parens': ['error', 'as-needed'],
        'babel/generator-star-spacing': ['error', 'before'],
        'block-scoped-var': 'error', // 强制把变量的使用限制在其定义的作用域范围内
        'block-spacing': 'off', // 强制在单行代码块中使用一致的空格
        'brace-style': 'off', // 强制在代码块中使用一致的大括号风格
        camelcase: 'off', // 强制使用骆驼拼写法命名约定
        'comma-dangle': 'off', // 要求或禁止末尾逗号
        'comma-spacing': 'off', // 强制在逗号前后使用一致的空格
        'comma-style': 'off', // 强制使用一致的逗号风格
        complexity: 'off', // 指定程序中允许的最大环路复杂度
        'computed-property-spacing': 'error', // 强制在计算的属性的方括号中使用一致的空格
        'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
        'consistent-this': 'error', // 当获取当前执行环境的上下文时，强制使用一致的命名
        'constructor-super': 'error', // 要求在构造函数中有 super() 的调用
        curly: 'off', // 强制所有控制语句使用一致的括号风格
        'default-case': 'error', // 要求 switch 语句中有 default 分支
        'dot-location': ['error', 'property'], // 强制在点号之前和之后一致的换行
        'dot-notation': 'off', // 强制在任何允许的时候使用点号
        'eol-last': 'off', // 强制文件末尾至少保留一行空行
        eqeqeq: ['error', 'smart'], // 要求使用 === 和 !==
        'func-names': 'off', // 强制使用命名的 function 表达式
        'func-style': ['error', 'declaration', { // 强制一致地使用函数声明或函数表达式
            allowArrowFunctions: true
        }],
        'generator-star-spacing': 'off', // 强制 generator 函数中 * 号周围使用一致的空格
        'id-length': ['error', { // 强制标识符的最新和最大长度
            exceptions: ['_', 'e', 'i', '$']
        }],
        indent: ['error', 4, { // 强制使用一致的缩进
            SwitchCase: 1
        }],
        'key-spacing': 'off', // 强制在对象字面量的属性中键和值之间使用一致的间距
        'keyword-spacing': ['off', { // 强制在关键字前后使用一致的空格
            overrides: {
                case: {
                    after: true
                },
                return: {
                    after: true
                },
                throw: {
                    after: true
                }
            }
        }],
        'linebreak-style': 'off',
        'lines-around-comment': 'off',
        'max-depth': 'error', // 强制可嵌套的块的最大深度
        'max-nested-callbacks': 'off',
        'max-params': ['error', 4],
        'new-cap': 'off',
        'new-parens': 'error', // 要求调用无参构造函数时有圆括号
        'newline-after-var': 'off',
        'no-alert': 'error', // 禁用 alert、confirm 和 prompt
        'no-array-constructor': 'error', // 禁止使用 Array 构造函数
        'no-bitwise': 'error', // 禁用按位运算符
        'no-caller': 'error', // 禁用 arguments.caller 或 arguments.callee
        'no-catch-shadow': 'off',
        'no-class-assign': 'error', // 禁止修改类声明的变量
        'no-cond-assign': ['error', 'always'], // 禁止条件表达式中出现赋值操作符
        'no-confusing-arrow': 'error', // 不允许箭头功能，在那里他们可以混淆的比较
        "no-console": 0,
        'no-const-assign': 'error', // 禁止修改 const 声明的变量
        'no-constant-condition': 'error', // 禁止在条件中使用常量表达式
        'no-div-regex': 'error', // 禁止除法操作符显式的出现在正则表达式开始的位置
        'no-dupe-class-members': 'error', // 禁止类成员中出现重复的名称
        'no-duplicate-imports': 'off', // disallow duplicate module imports
        'no-else-return': 'error', // 禁止 if 语句中有 return 之后有 else
        'no-empty-label': 'off',
        'no-empty': 'off',
        'no-eq-null': 'error', // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eval': 'error', // 禁用 eval()
        'no-extend-native': 'error', // 禁止扩展原生类型
        'no-extra-bind': 'error', // 禁止不必要的 .bind() 调用
        'no-extra-parens': 'error', // 禁止不必要的括号
        'no-floating-decimal': 'error', // 禁止数字字面量中使用前导和末尾小数点
        'no-implied-eval': 'error', // 禁止使用类似 eval() 的方法
        'no-inline-comments': 'error', // 禁止在代码行后使用内联注释
        'no-iterator': 'error', // 禁用 __iterator__ 属性
        'no-label-var': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'error', // 禁用不必要的嵌套块
        'no-lonely-if': 'off',
        'no-loop-func': 'error', // 禁止在循环中出现 function 声明和表达式
        'no-mixed-requires': 'error', // 禁止混合常规 var 声明和 require 调用
        'no-mixed-spaces-and-tabs': 'off',
        'no-multi-spaces': 'off',
        'no-multi-str': 'off',
        'no-native-reassign': 'error', // 禁止对原生对象赋值
        'no-nested-ternary': 'error', // 不允许使用嵌套的三元表达式
        'no-new-func': 'error', // 禁止对 Function 对象使用 new 操作符
        'no-new-object': 'error', // 禁止使用 Object 的构造函数
        'no-new-require': 'error', // 禁止调用 require 时使用 new 操作符
        'no-new-wrappers': 'error', // 禁止对 String，Number 和 Boolean 使用 new 操作符
        'no-new': 'error', // 禁止在非赋值或条件语句中使用 new 操作符
        'no-octal-escape': 'error', // 禁止在字符串中使用八进制转义序列
        'no-path-concat': 'error', // 禁止对 __dirname 和 __filename进行字符串连接
        'no-process-env': 'error', // 禁用 process.env
        'no-process-exit': 'error', // 禁用 process.exit()
        'no-proto': 'error', // 禁用 __proto__ 属性
        'no-restricted-modules': 'error', // 禁用指定的通过 require 加载的模块
        'no-return-assign': 'error', // 禁止在 return 语句中使用赋值语句
        'no-script-url': 'error', // 禁止使用 javascript: url
        'no-self-compare': 'error', // 禁止自身比较
        'no-sequences': 'error', // 禁用逗号操作符
        'no-shadow-restricted-names': 'error', // 禁止覆盖受限制的标识符
        'no-shadow': 'off',
        'no-spaced-func': 'off',
        'no-sync': 'off', // 禁用同步方法
        'no-this-before-super': 'error', // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-throw-literal': 'error', // 禁止抛出非异常字面量
        'no-trailing-spaces': 'error', // 禁用行尾空格
        'no-undef-init': 'error', // 禁止将变量初始化为 undefined
        'no-undefined': 'off',
        'no-underscore-dangle': 'off',
        'no-unexpected-multiline': 'error', // 禁止出现令人困惑的多行表达式
        'no-unneeded-ternary': 'error', // 禁止可以在有更简单的可替代的表达式时使用三元操作符
        'no-unused-expressions': 'error', // 禁止出现未使用过的表达式
        "no-unused-vars": [1, { // 禁止出现未使用过的变量
            "vars": "all",
            "args": "after-used"
        }],
        'no-use-before-define': 'error', // 不允许在变量定义之前使用它们
        'no-useless-call': 'error', // 禁止不必要的 .call() 和 .apply()
        'no-useless-concat': 'error', // 禁止不必要的字符串字面量或模板字面量的连接
        'no-var': 'off',
        'no-void': 'error', // 禁用 void 操作符
        'no-warning-comments': 'off',
        'no-with': 'off',
        'object-curly-spacing': 'off',
        'object-shorthand': 'error', // 要求或禁止对象字面量中方法和属性使用简写语法
        'one-var': 'off',
        'operator-assignment': 'error', // 要求或禁止在可能的情况下要求使用简化的赋值操作符
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        'prefer-arrow-callback': 'off',
        'prefer-const': 'error', // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-spread': 'error', // 要求使用扩展运算符而非 .apply()
        'prefer-template': 'off', // 要求使用模板字面量而非字符串连接
        quotes: 'off',
        'quote-props': 'off',
        radix: 'error', // 强制在parseInt()使用基数参数
        'require-yield': 'error', // 要求generator 函数内有 yield
        "semi": ["error", "always"], // 要求或禁止使用分号
        'semi-spacing': 'off',
        'sort-vars': 'error', // 要求同一个声明块中的变量按顺序排列
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': 'off',
        'space-infix-ops': 'off',
        'space-unary-ops': 'off',
        'spaced-comment': 'off',
        strict: 'off',
        'valid-jsdoc': 'error', // 强制使用有效的 JSDoc 注释
        'vars-on-top': 'off',
        yoda: 'off',
        'wrap-iife': 'off',
        'wrap-regex': 'error' // 要求正则表达式被括号括起来
    }
}
复制代码
```

## 第五篇  静态资源服务器

#### 5.1 `http`模块

```
const http = require('http');
const chalk = require('chalk');
const hostname = '127.0.0.1';

const port = '3000';
const server = http.createServe((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    const addr = `Server running at http://${hostname}:${port}/`;
    console.log(`${chalk.green(addr)}`);
})
复制代码
```

- `supervisor`监视文件模块
- `hotnode`热启动模块

完整代码：请[参照](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FbigbigDreamer%2FSunflowerCollection%2Ftree%2Fmaster%2FNodeServer)

## 第六篇  测试

#### 6.1 断言测试

- assert- 断言调试

```
console.assert(a===b,msg);
复制代码
```

常用断言库：chai.js

#### 6.2 mocha.js

```
//you should install mocha

// $ npm install --save-dev mocha

// you should know the '#math' only is it's description
describe('#math', ()=> {
    describe('#add', ()=> {
        it('should return 5 when 2 + 3', () => {
            ecpect('your test','targetResult');
        });
    });
});
复制代码
```

Note :如果你想只执行一个模块的，你可以在package.json中配置

```
"scripts": {
  "test": "mocha /url/xxx.js
}
复制代码
```

#### 6.3 istanbul

你可以[参照](https://link.juejin.im?target=%255Bhttps%3A%2F%2Fistanbul.js.org%255D(https%3A%2F%2Fistanbul.js.org%2F))

#### 6.4  benchmark.js

- 性能测试框架，具体[参见](https://link.juejin.im?target=https%3A%2F%2Fbenchmarkjs.com%2Fdocs)

```
//常见测试方法
console.time('markPoint');

console.timeEnd('markPoint');
复制代码
```

#### 6.5 [jsbench.js](https://link.juejin.im?target=https%3A%2F%2Fjsbench.me%2F)

- 在FCC社区听老外告诉的，自己做了测试，确实是可以测试两段代码的性能差异。

## 第七篇 UI测试

#### 7.1 传统测试

```
## 传统测试自然就是人工点击

## 弊端就是发现错误不健全
复制代码
```

#### 7.2 webdriver

[参照](https://link.juejin.im?target=https%3A%2F%2Fxinklabi.iteye.com%2Fblog%2F2093500)

## 第八篇 爬虫

#### 8.1 爬虫与反爬虫

==爬虫==：按照一定的规则自动抓取网络信息的程序

==反爬虫==：

- User-Agent，Referer，验证码
- 单位时间的访问次数，访问量
- 关键信息用图片混淆
- 异步加载

#### 8.2 爬虫思路

思路一：使用cheerio与http/https

- cheerio：一个可以像jQuery那样操作DOM元素
- http/https：我就不用说了吧

```
//简单示例
const cheerio = require('cheerio');
const https = require('https');
let html = '';
const $ = '';
https.get('url',res => {
    res.on('data',(data) => {
        html += data;
    });
    res.on('finish',()=> {
        $ = cheerio.load(html);
        //some code
    })
})
复制代码
```

思路二：[puppeteer](https://link.juejin.im?target=https%3A%2F%2Fzhaoqize.github.io%2Fpuppeteer-api-zh_CN%2F%23%2F)

- 下边贴一段爬虫代码吧！

```
index.js
const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
(async () => {
    //跳过安装  npm i --save puppeteer --ignore-scripts
    const browser = await puppeteer.launch({
        executablePath: 'G:/chrome-win/chrome-win/chrome.exe'
    });
    const page = await browser.newPage();
    //指定浏览器去某个页面
    await page.goto('https://image.baidu.com');
    // await page.cookies('https://image.baidu.com')
    //     .then(data => {
    //         console.info(data)
    //     });
    //调大视口，方便截图，方便容纳更多地图
    await page.setViewport({
        width:2000,
        height:1000,
    });
    //模拟用哪个户输入
    await page.keyboard.sendCharacter('车模');
    //模拟用户点击搜索
    await page.click('.s_search');
    console.info('开始点击查询......');
    //await page.screenshot({path: 'example.png'});
     page.on('load', async()=> {
         console.info('页面已加载完毕，开始爬取');
        await page.screenshot({path: 'example.png'});
          let srcs = await page.evaluate(() => {
             let img =  document.querySelectorAll('img.main_img');
             return Array.from(img).map(item => item.src);
         });
         await srcs.forEach((item,index) => {
                  if(/^https:/g.test(item))
                  https.get(item,res =>{
                      res.pipe(fs.createWriteStream(__dirname + `/img/${index}.png`))
                          .on('finish',()=>{
                              console.info(`已成功爬取${index + 1}条记录！`);
                          });
                  })
              })
         await browser.close();
    });
     
})();
复制代码
package.json
{
  "name": "reptiles",
  "version": "1.0.0",
  "description": "This is a replite",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "vuejs@vip.qq.com",
  "license": "ISC",
  "dependencies": {
    "puppeteer": "^1.14.0"
  }
}

复制代码
```

- How To Use?

```
## 初始化你的项目

$ npm init

## 建立文件

$ cd your project
$ mkdir index.js
## 拷贝我的package.json
## 注意，这是重点，因为被墙，所以必须跳过安装
$ npm i --save puppeteer --ignore-scripts

## 启动项目

$ npm start

复制代码
```

- Note SomeDetails 
  - 1.安装`puppeteer`，必须跳过`Chromium`的连接
  - 2.安装好你的`Chromium`,在lanuch的时候必须用绝对路径，切记不可把`chrom.exe`单纯拷贝到项目目录
  - 3.不可把浏览器视口调节的太大，不然会触碰反爬虫协议。
  - 4.如果你调大了也没关系，我们可以`page.waitFor(200)`，让任务沉睡一会儿

## 结语

  这篇大长文就算彻底结束了，我相信文章里面还有很多不足或者小错误，诚恳的希望大家不要喷我，我现在仅仅是个大三的小学生，在以后的工作中，我也会不断的吸取知识的精髓去修缮这篇文章。

​            我热爱学习，当然更加热爱代码。有一句至理名言分享给大家

​            "你能不能，在于你想不想！"

​            加油，每一天都是新生。

​             对于这篇文章，我也会不断的完善它。

------

​             最后再做一遍自我介绍：

​            我叫EricWang，今年大三，是个蓝孩纸，想跟我一起交流就关注我吧！

作者：吾乃不良人

链接：https://juejin.im/post/5ca550026fb9a05e526d8adc

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。