# MVVM

知识点
---
- Model - View - ViewModel

- 原理总结
    - 利用Object.defineproperty监听数据变化
    - 利用事件实现页面监听
    - 视图模板编译
    - 利用观察者模式

详细步骤 （以下所有step中的代码可以独立运行）
----

1. Object.defineproperty监听数据变化
    1. [Object.defineproperty原理](ch14.md)
    1. [单向数据绑定](../src/mvvm/step1)
    1. [重构可以接受非固定值数据绑定](../src/mvvm/step2)
    1. [重构面向对象写法](../src/mvvm/step3)
1. 事件监听实现双向绑定
    1. [尝试双向绑定(实现中)]()

1. [视图模板编译(仅针对id绑定)](../src/mvvm/step5)

1. 引入观察者模式
    1. [什么是观察者模式](ch15.md) | ([代码例子](../src/observer))
    1. [重构引入发布订阅模式](../src/mvvm/step4)
    1. [重构将订阅者独立并规范出来(实现中)]()
    1. [通过编译模板添加订阅者(实现中)]()
1. 其他
    1. mounted的实现
    ```js
        options.mounted.call(this)
    ```

参考资料
----
- [如何检测一个普通对象的变化](http://hcysun.me/2016/04/28/JavaScript%E5%AE%9E%E7%8E%B0MVVM%E4%B9%8B%E6%88%91%E5%B0%B1%E6%98%AF%E6%83%B3%E7%9B%91%E6%B5%8B%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%8F%98%E5%8C%96/)
- [Vue2.1.7源码学习](http://hcysun.me/2017/03/03/Vue源码学习)
- [源码](https://github.com/HcySunYang/vue-design)
- 

