# CommonJS模块规范

## CommonJS
### 基础
```js
// 导出
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
// 加载
var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```
### exports与module.exports
```js
    // Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令
    var exports = module.exports;
```
## ES6模块规范
```js
    // profile.js
    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;
    export {firstName, lastName, year};

    // 写法一
    export var m = 1;

    // 写法二
    var m = 1;
    export {m};

    // 写法三
    var n = 1;
    export {n as m};

```
### export default 命令
```js
    // 使用export default命令，为模块指定默认输出。
    // export-default.js
    export default function () {
    console.log('foo');
    }
```
参考资料
CommonJS规范，http://javascript.ruanyifeng.com/nodejs/module.html
ES6 Module 的语法，http://es6.ruanyifeng.com/#docs/module