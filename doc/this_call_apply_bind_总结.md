# this,call,apply,bind 总结



>对js中的一些基本的很重要的概念做一些总结，对进一步学习js很重。

**一、this**

　　JavaScript 中的 this 总是指向一个对象，而具体指向那个对象是在运行时基于函数的执行环境动态绑定的，而非函数声明时的环境
    　　实际应用中 this 的指向大致可以分为以下 4 中：
        　　1. 作为对象的方法调用
        　　2. 作为普通函数调用
        　　3. 构造器调用
        　　4. Function.prototype.call 或 Function.prototype.apply 调用, 可以动态地改变出入函数的 this

　　**1. 作为对象的方法调用时， this 指向该对象**(javascript:void(0);)

```
1 var obj = {
2     a: 1,
3     getA: function(){
4         console.log( this == obj ); // true
5         console.log( this.a ); // 1
6     }
7 };
8 obj.getA();
```


　　**2. 作为普通函数调用，this 总是指向全局对象 window**

```
1 console.log(this); // Windows
2 
3 window.name = "globalName";
4 var getName = function() {
5     return this.name;
6 }
7 
8 console.log( getName() ); // globalName
```

　　**3. 构造器调用, 当用 new 运算符调用函数时，该函数总是会返回一个对象，通常情况下，构造函数里的 this 就指向返回的这个对象**

```
1 var MyClass = function(){
2     this.name = "class";    
3 }
4 var obj = new MyClass();
5 console.log( obj.name ); // class
```

 

　　如果使用 new 调用构造器时，构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我么之前期待的 this

```
1 var MyClass = function(){
2     this.name = "class";
3     return {
4         name: "other"
5     }
6 }
7 var obj = new MyClass();
8 console.log(obj.name); // other
```


**二、 call 和 apply**

　　他们的作用一模一样，区别仅在于传入参数形式的不同。
      apply 接收两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以是数组，也可以是类数组，apply 方法把这个集合中的元素作为参数传入被调用的函数。
      call 传入的参数不固定，跟 apply 相同的是，第一个参数也代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数

```
1 var func = function(a, b, c){
2     console.log([a, b, c]);
3 }
4 //传入的第一个参数为 null ，函数体内的 this 会指向默认的宿主对象，在浏览器中则是 window
5 func.apply(null, [1, 2, 3]); // 输出：[ 1, 2, 3 ]
6 
7 func.call(null, 1, 2, 3); // 输出：[ 1, 2, 3 ]
```

 

call 和 apply 的用途:
**1. 改变 this 指向**

```
 1 var obj1 = {
 2     name: "obj1"
 3 };
 4 var obj2 = {
 5     name: "obj2"
 6 };
 7 
 8 window.name = "window";
 9 
10 var getName = function(){
11     console.log( this.name );
12 }
13 
14 getName(); // window
15 getName.call( obj1 ); // obj1
16 getName.call( obj2 ); // obj2
```


　　当执行 getName.call( obj1 ) 这句代码时， getName 函数体内的 this 就指向 obj1 对象，所以此处的

```
var getName = function(){
    console.log( this.name );
}
```

​	实际上相当于

```
var getName = function(){
    console.log( obj1.name );
}
```



  　　2. 用来模拟 Function.prototype.bind 指定函数内部的 this 指向

　　3. 借用其他对象的方法， 可以模拟实现继承**

```
 1 var A = function(name){
 2     this.name = name;
 3 }
 4 var B = function(){
 5     A.apply( this, arguments);
 6 }
 7 B.prototype.getName = function(){
 8     return this.name;
 9 }
10 
11 var b = new B("2B铅笔");
12 console.log( b.getName() ); // 输出： 2B铅笔
```

借用 Array.prototype 对象上的方法，对参数列表 arguments 这个类数组对象，进行数组对象方法的调用

```
1 (function(){
2     Array.prototype.push.call( arguments, 3);
3     console.log( arguments ); // 输出： [1, 2, 3]
4 })(1, 2); 
```

**三、ECMAScript 5 中的 bind() 方法可以将函数绑定到一个对象上**　　

```
1 function f(y) {return this.x + y};
2 var o = { x: 1};
3 var g = f.bind(o);
4 g(2); // 3
```

 

