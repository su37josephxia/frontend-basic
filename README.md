doc# frontend-basic
前端基础知识汇总

## 大纲
1. JS基础篇 （ECMA 262标准）
    1. [变量类型和计算](doc/ch01.md)
    1. [原型和原型链](doc/ch02.md)
    1. [作用域和闭包](doc/ch03.md)
    1. [异步和单线程](doc/ch04.md)
    1.[异常处理](doc/ch18.md)
    1. [其他](doc/ch05.md)
1. JS Web API (W3C标准)
    1. [DOM操作](doc/ch06.md)
    1. [BOM操作](doc/ch07.md)
    1. [事件](doc/ch08.md)
    1. [Ajax](doc/ch09.md)
    1. [存储](doc/ch10.md)
1. 开发环境
    1. IDE
    1. 版本功能git
    1. [模块化](doc/ch11.md)
1. 运行环境(doc/ch12.md)
1. ES6语法
1. 原型的高级应用
1. 异步的高级应用
    1. 流程控制中的是是非非 callback promise generator co async/await
1. 虚拟DOM
1. Vue/React
1. Hybird
1. [MVVM](doc/ch13.md)
1. 设计模式 - 每一个都是实际的例子不是Helloworld
    1. [单例模式 - Single - 网页弹框]((./src/singleten))
    1. [观察者模式 - Observer - 多对话框内容同步](./src/observer)
    1. [策略模式 - Strategy - 有效性检查策略](./src/strategy)
    1. [代理模式 - Proxy- 预加载图片(做成中..)]()
    1. [Mixin模式 - JS原型链属性复制]
    - [参考资料](https://blog.csdn.net/song_mou_xia/article/details/80763833)


1. 面试技巧
    - 真实项目经历
    - 博客和开源项目
    - 对加班的态度：加班像借钱救急不救穷
    - 谈谈你的缺点：正在学的东西xxx 就说你xxx还不会（网上查的目的就是说客观缺点 不要说主观缺点）
1. [CommonJS与ES6语法区别](./doc/ch16.md)

## 示例代码运行
- NodeJS 8.0 need https://nodejs.org/en/
- Clone or download this repository
Enter your local directory, and 
- install dependencies:
``` bash
npm install
npx live-server --open=./src

```

## 思维导图
![avatar](xmind/interview.jpg)
