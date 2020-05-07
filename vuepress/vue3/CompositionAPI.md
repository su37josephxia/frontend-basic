# 复合API(CompositionAPI)

## 概念
CompositionAPI被如果只是字面的意思可以被翻译成组合API。他以前的名字是Vue Function-based API ,我认为现在的名字更为达意。本质上CompositionAPI就是为了更为方便的实现逻辑的组合而生的。

## OptionsAPI的不足

```js
const App = {
            template: `
                <button @click='click'>{{message}}</button>
            `,
            data() {
                return {
                    message: 'Hello Vue 3!!'
                }
            },
            methods: {
                click() {
                    console.log('click ....', this.message)
                    this.message = this.message.split('').reverse().join('')
                }
            }
        }
```

经典的options API是以定义声明风格API。

以上面的代码为例

- 定义视图模板 
- 定义数据模型
- 定义逻辑方法

这种api最大的优点就是理解容易。定义型代码更像是html和css这种定义型语言。

但是缺点也很明显，当逻辑相对复杂时，很多相似逻辑无法复用。



比如Vue2如果要在组件中实现逻辑的组合，譬如所有按钮组件都要实现防抖，可选的方式大概有以下三个:

- Mixins
- 高阶组件 (Higher-order Components, aka HOCs)
- Renderless Components (基于 scoped slots / 作用域插槽封装逻辑的组件
但三者都不是非常的理想，主要问题存在
- 模板数据来源不清晰, 譬如mixin光看模板很难分清一个属性是哪里来的。
- 命名空间冲突
- 性能问题。 譬如HOC需要额外的组件逻辑嵌套 会导致无谓的性能开销。

但是我更在意的是对于逻辑的组合这种原始的编程行为我不得不引入其他概念来处理。当然这个也是为什么很多从java转过来的架构师更喜欢react的原因。vue算是笑着进去哭着出来的语言。入门好像很容易看看helloworld就可以工作了，但一遇到问题就需要引入一个新概念。不像React函数即组件那么清爽自然。



CompositionAPI的灵感来源于React Hooks的启发(这个是尤大承认的)。好的东西需要借鉴这个大家不要鄙视链。使用函数组合API可以将关联API抽取到一个组合函数 该函数封装相关联的逻辑，并将需要暴露给组件的状态以响应式数据源的形式返回。



首先先看一下

```js
const App = {
            template: `
                <button @click='click'>{{message}}</button>
            `,
            data() {
                return {
                    message: 'Hello Vue 3!!'
                }
            },
            methods: {
                click() {
                    console.log('click ....', this.message)
                    this.message = this.message.split('').reverse().join('')
                }
            }
        }
        let vm = Vue.createApp().mount(App, '#app')
```
> [options api源代码位置](https://github.com/su37josephxia/vue3-study/blob/master/demo/api/options.html)

经典的Vue API可以归纳为options API，可以理解为基于配置的方式声明逻辑的API。啥意思基本是已定义为基础的。想一想vue2的helloworld是不是好像只是完成了几个简单的定义就可以实现功能。我认为这个也是为什么vue那么流行的原因 对于描述一般的逻辑的确非常简单。当然这也和尤大神是从设计师出身有很大的关系。别让了css和html语言是彻头彻尾的定义性代码。

但是一旦业务逻辑复杂的话这种表达方式就会存在一定问题。因为逻辑一旦复杂你不能给他写成一坨，必须要考虑如何组织，你要考虑抽取逻辑中的共用部分考虑复用问题，不然程序将变成非常难以维护。上文中已经提到了哪三种复用方式一方面来讲需要因为全新的概念另外确实编程体验太差还有性能问题。

## CompositionAPI提出

CompositionAPI的灵感来源于React Hooks的启发(这个是尤大承认的)。好的东西需要借鉴这个大家不要鄙视链。使用函数组合API可以将关联API抽取到一个组合函数 该函数封装相关联的逻辑，并将需要暴露给组件的状态以响应式数据源的形式返回。

好了上代码，第一段逻辑是尤大的逻辑鼠标位置监听逻辑

好了上代码，第一段逻辑是尤大的逻辑鼠标位置监听逻辑
```js
// 尤大神的经典例子 鼠标位置侦听逻辑 
function useMouse() {
  const state = reactive({
    x: 0,
    y: 0
  })
  const update = e => {
    state.x = e.pageX
    state.y = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return toRefs(state)
}
```

我们还想组合另外一段逻辑 比如随时刷新的时间逻辑
```js
function useCounter() {
  const state = reactive({
    num: 1
  })
  onMounted(() => {
    setInterval(() => {
      state.num++
    }, 1000)
  })
  return toRefs(state)
}
```

在实际的工作中我们可以认为这两个逻辑可能被很多组件复用，想想你要是用mixin和hoc你将多么无所是从。但是利用CompositionAPI，我们只需要把他组合并暴露 like this
```js
const MyComponent = {
  template: `<div>x:{{ x }} y:{{ y }} num: {{num}}</div>`,
  setup() {
    return {
      ...useMouse(),
      ...useCounter()
    }
  }
}
```



## API列表
我们先看看Vue3的基础API都有哪些？
```js
const {
            createApp,
            reactive, // 创建响应式数据对象
            ref, // 创建一个响应式的数据对象
            toRefs, // 将响应式数据对象转换为单一响应式对象
            isRef, // 判断某值是否是引用类型
            computed, // 创建计算属性
            watch, // 创建watch监听
            // 生命周期钩子
            onMounted,
            onUpdated,
            onUnmounted,
        } = Vue
```
### setup使用composition API的入口
> setup函数会在 beforeCreate之后 created之前执行
```js
setup(props,context){
    console.log('setup....',)
    console.log('props',props) // 组件参数
    console.log('context',context) // 上下文对象
} 

```

![](https://user-gold-cdn.xitu.io/2019/10/16/16dd411f4d352219?w=714&h=139&f=png&s=39922)

好的其实大家可以和自己原来的React偶不Vue2代码对号入座。

### reactive
> reactive() 函数接受一个普通对象 返回一个响应式数据对象
```js
    const state = reactive({
        count: 0,
        plusOne: computed(() => state.count + 1)
    })
```

### ref 与 isRef

> - ref 将给定的值(确切的说是基本数据类型 ini 或 string)创建一个响应式的数据对象
> - isRef 其实就是判断一下是不是ref生成的响应式数据对象

首先这里面有一个重要的概念叫包装对象(value wrapper)，谈到wrapper从java那边转过来的小朋友肯定记得java里面的wrapclass其实概念差不多啦。我们知道基本数据类型只有值没有引用，这样也就造成了一个问题返回一个基础数据类型比如一个字符串是无法跟踪他的状态的，所以我们就需要讲基础数据类型包装一下，这有点像ReactHooks中的useRef，但是Vue包装的对象本身就是响应式数据源。好了我们看一下实例理解一下

```js
    // 定义创建响应式数据
    const time = ref(new Date())
    // 设置定时器为了测试数据响应
    setInterval(() => time.value = new Date(), 1000)

    // 判断某值是否是响应式类型
    console.log('time is ref:', isRef(time))
    console.log('time', time)
    console.log('time.value', time.value)
    
    // 我们看看模板里面我们这样展示
    template: `
        <div>
            <div>Date is {{ time }}</div>
        </div>
    `
```

### toRefs
> - toRefs 可以将reactive创建出的对象展开为基础类型
```js
    // 如果不用toRefs
    const state = reactive({
        count: 0,
        plusOne: computed(() => state.count + 1)
    })
    return {
        state
    }
    // 模板渲染要这样写
    template: `
    <div>
        <div>count is {{ state.count }} </div>
        <div>plusOne is {{ state.plusOne }}</div>
    </div>
    `
    
    // 我们再看看用了toRefs
    const state = reactive({
        count: 0,
        plusOne: computed(() => state.count + 1)
    })
    return {
        ...toRefs(state)
    }
    // 模板渲染要这样写
    template: `
    <div>
        <div>count is {{ count }} </div>
        <div>plusOne is {{ plusOne }}</div>
    </div>
    `
```

### watch 定义监听器
这个其实没有什么新东西
```js
   watch(() => state.count * 2, val => {
        console.log(`count * 2 is ${val}`)
    })
```
### effect 副作用函数
> 响应式对象修改会触发这个函数
```js
    // 副作用函数
    effect(() => {
        console.log('数值被修改了..',state.count)
    })
```

### computed 计算属性
```js
const state = reactive({
    count: 0,
    plusOne: computed(() => state.count + 1)
})
```

## 生命周期钩子 - Hooks

|Vue2  |Vue3 |
|----- |----- |
|beforeCreate|setup(替代)|
|created|setup(替代)|
|beforeMount|onBeforeMount|
|mounted|onMounted|
|beforeUpdate|onBeforeUpdate|
|updated|onUpdated|
|beforeDestroy|onBeforeUnmount|
|destroyed|onUnmounted|
|errorCaptured|onErrorCaptured|

[完整代码实现](https://github.com/su37josephxia/vue3-study/blob/master/demo/compositions-api/base-api.html)



## 实战 - 定制变色按钮

假设一个产品经理突发奇想的想了这样一个需求。就是让按钮颜色可以随机变色。首先如果是随机变色就一定需要JS逻辑的帮助。假设我们项目已经做了很久已经有了自己很成型的控件库。想解决这个问题我们首先会想到了继承。当然在Vue里面我们可以等效为Mixins。



当时过两天产品经理又提出了一个扩展性意见，鉴于变色按钮效果不错，他希望把字体也变成随机可变的。而且需要根据需求来配置变色主色和变色频率。



### 需求分析

- 典型逻辑组合问题
- 如果使用继承方式会涉及多重继承和交叉继承
- 可以考虑使用CompositionAPI来解决



### 实现

```js
function useColor(type, time) {
  const state = reactive({
    color: '#000000'
  })
  onMounted(() => {
    setInterval(() => {
      const r = type === 'r' ? Math.floor(Math.random() * 255).toString(16) : '00'
      const g = type === 'g' ? Math.floor(Math.random() * 255).toString(16) : '00'
      const b = type === 'b' ? Math.floor(Math.random() * 255).toString(16) : '00'
      var color =
          `#${ r + g + b}`
      state.color = color
    }, time)
  })
  return toRefs(state)
}
```



```js
const MyComponent = {
  template: `<button type="button" class="el-button" :style="{ background,color }"><span>按钮</span></button>`,
  setup() {
    const {
      color
    } = useColor('r', 100)
    const {
      color: background
    } = useColor('b', 1000)
    return {
      color,
      background
    }
  }
}
createApp(MyComponent).mount('#app')
```

