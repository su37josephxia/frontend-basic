# 我真的懂 this 吗

## 先知

> this 实际上是在函数被调用时发生的绑定，它指向哪里完全取决于函数在哪里被调用。

### 大提示: 不想看分析的可以直接拉到最后看结论。

### 面试常见题

#### 第一题

```
function foo(){
  console.log(this.a)
}
var obj = {
  a :2,
  foo:foo
}
var bar = obj.foo
obj.foo() 
bar()  
复制代码
```

问： 最后两个打印出什么？

#### 第二题

```
function foo(){
  console.log(this.a)
}
var obj = {
  a :2,
  foo:foo
}
var obj2 = {
  a:1,
  obj:obj
}
var obj3 = obj2.obj.foo
obj2.obj.foo() // 2
obj3() //undefined
复制代码
```

问： 最后两个打印出什么？ 答？

## 我们如何理解 this 绑定的到底是谁？或者说 this 到底是谁？下面介绍四种方法

### 1. 默认绑定

什么是默认绑定呢？上代码先

```
var a = 2;
function foo(){
  console.log(this.a)
}
function foo2(){
  'use strict'
  console.log(this.a)
}
foo() // 2
foo2() //  TypeError: Cannot read property 'a' of undefined
复制代码
```

- 在上面的代码中，「 foo() 直接使用时不带任何修饰的函数引用进行调用的 」， 因此只能使用「默认绑定」
- 所以到 foo() 中的 this 绑定到「 全局对象 window 」，而「 严格模式 」时，全局对象无法被绑定，所以 this 绑定到 「undefined」

**默认绑定总结：默认绑定即不带任何修饰的函数引用被调用时的绑定，此时 this 绑定到「 全局对象 window 」或者 「undefined」**

### 2. 隐式绑定

#### 隐式绑定是什么呢？隐式的绑定

> 当函数引用有上下文对象时，隐式绑定会把函数调用中的 this 绑定到这个上下文对象。

**那么回到面试题**

#### 2.1 面试题一

```
function foo(){ console.log(this.a)}
var obj = { a :2,  foo:foo }
var bar = obj.foo
obj.foo() //2
bar()  /undefined

复制代码
```

foo() 被调用时，落脚点指向 obj 对象（上下文对象），所以 this 绑定到 obj ，this.a 即 obj.a , 所以打印出了 2

**但是为什么 bar() 打印出了 undefined 呢？**

虽然 bar 是 obj.foo 的引用，但实际上是 foo函数 本身的引用，所以此时 bar() 是不带任何修饰的函数调用，使用默认调用

#### 2.2 面试题二

```
function foo(){ console.log(this.a)  }
var obj = {  a :2,  foo:foo  }
var obj2 = {  a:1,  obj:obj   }
var obj3 = obj2.obj.foo
obj2.obj.foo() // 2
obj3() //undefined
复制代码
```

跟上面一题相同，虽然引用链比较长，但是最后 foo() 是在 obj 中被调用，所以 this 绑定到 obj ，引用链只有最后一层影响调用位置。

#### 隐式绑定总结 ： 函数在上下文对象中调用时， this 绑定到 上下文对象上。

### 3. 显式绑定

> 使用「 call apply bind 」 进行绑定 this , this 绑定到第一个传入的参数

[MDN三者的用法](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fcall%23)

#### 3.1 call 的使用

回到面试题第一题，我们使用「 call 」进行显式绑定

```
function foo(){ console.log(this.a)  }
var obj = {
  a :2,
  foo:foo
}
var bar =obj.foo
obj.foo() // 2
bar.call(obj) //2
复制代码
```

此时两者都打印出 2 ，因为我们将 this 绑定到 obj ，打印出的即是 [//obj.a](https://link.juejin.im/?target=%2F%2Fobj.a) //2

#### 3.2 apply 绑定第一个参数是 this , 二参是 一个数组

#### 3.3 bind 是 绑定第一个参数是 this

#### 显式绑定总结: 使用call apply bind 时，第一个参数是 this ，不传的话，默认为 undefined 。

### 4. new 绑定

##### 使用 new 来调用函数， 到底做了什么 ？

- 1. 创建一个全新的对象
- 1. 这个新对象的__proto__ 链接到 构造函数的 prototype
- 1. 这个新对象会绑定到函数调用的 this
- 1. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

```
function foo(a){
  this.a = a 
}
var bar = new foo(2)

console.log(bar.a) // 2
复制代码
```

分析： 使用 new 调用 foo() 时，我们构造一个对象并把它绑定到 foo() 调用的 this 上

\####new 绑定总结： new 绑定中 this 绑定的就是新生成的对象

## 总结

- 1. 「 箭头函数 」内的 this 就是外面的 this ，外面的 this 是啥看下面四条
- 2 . 「 new 绑定 」函数是否在 new 中调用 ？ 如果是 this 绑定的即是 新创建的对象。 var bar = new foo()
- 1. 「 显式绑定 」函数是否通过 call 、apply、 bind 绑定？this绑定的时第一个参数 var bar = foo.call(obj)
- 4.「 隐式绑定 」 函数是否在某个上下文中调用？ 是的话，this 绑定的是那个上下文对象 var bar = obj.foo()
- 1. 「 默认绑定」如果都不是，那么就是默认绑定。严格模式绑定到 undefined ，否则绑定到 全局对象 var bar = foo()

**后记**

你要是看不懂我也没办法了，我的修为都在这了。。。。

文章为个人总结，不足之处还请留言或私信。

转载请注明出处。

以上。