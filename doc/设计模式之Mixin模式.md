# [设计模式之Mixin模式](https://www.cnblogs.com/caizhenbo/p/6782522.html)



**介绍**

mixin模式就是一些提供能够被一个或者一组子类简单继承功能的类,意在重用其功能。在面向对象的语言中，我们会通过接口继承的方式来实现功能的复用。但是在javascript中，我们没办法通过接口继承的方式，但是我们可以通过javascript特有的原型链属性，将功能引用复制到原型链上，达到功能的注入。

**具体实现代码：**

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
var Car = function(opts){
    this.speed = opts.speed || 0
  } 

  var Bike = function(opts){
    this.speed = opts.speed || 0;
    this.ride = function(){
      console.log('现在骑行速度是' + this.speed)
    }
  }

  var Feature = function(){

  }

  Feature.prototype = {
    drive : function(){
      console.log('现在开车速度是' + this.speed)
    },
     accelerate : function(val){
        this.speed = this.speed + val;
     }
  }

  //混入模式的实现
  function Mixin(recClass,giveClass){
    if(arguments.length > 2){
      for(var i = 2,lenth = arguments.length; i < lenth ; ++ i){
        var methodName = arguments[i];
        recClass.prototype[methodName] = giveClass.prototype[methodName];
      }
    }else{
      for(var methodName in giveClass.prototype){
        if(!recClass.prototype[methodName]){
          recClass.prototype[methodName] = giveClass.prototype[methodName];
        }
      }
    }
  }

  Mixin(Car,Feature);
  var BMW = new Car({
  })
  
  BMW.accelerate(20)
  BMW.drive()

  Mixin(Bike,Feature,'accelerate');
  
  var ofo = new Bike({})

  ofo.accelerate(8);
  ofo.ride();
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

**优点和缺点**

Mixin支持在一个系统中降解功能的重复性,增加功能的重用性.在一些应用程序也许需要在所有的对象实体共享行为的地方,我们能够通过在一个Mixin中维护这个共享的功能,来很容易的避免任何重复,而因此专注于只实现我们系统中真正彼此不同的功能。

也就是说,对Mixin的副作用是值得商榷的.一些开发者感觉将功能注入到对象的原型中是一个坏点子,因为它会同时导致原型污染和一定程度上的对我们原有功能的不确定性.在大型的系统中,很可能是有这种情况的。