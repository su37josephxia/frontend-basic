# DOM操作

### DOM本质

DOM - DocumentObjectModel

> 获取DOM节点
```
    var div 1 = document.getElementById('div1') // 元素
    var divList = document.getElementsByTagName('div') // 集合
    console.log(divList.length)
    console.log(divList[0])

    var containerList = document.getElementsByClassName('.container') //集合
    var pList = document.querySelectAll('p') //集合
```

> property
```
    var pList = document.querySelectAll('p') 
    var p = pList[0]
    // 样式
    console.log(p.style.width) 
    p.style.width = '100jpx'
    // class
    console.log(p.className)
    p.className = 'p1'

    console.log(p.nodeName)
    console.log(p.nodeType)
```
> DOM结构操作
```
var div1 =document.getElementById('div1')
// 新增节点
var p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) //添加新创建的元素

// 移动已有节点
var p2 = document.getElementById('p2')
div1.appendChild(p2)


var div1 = document.getElementById('div1')
// 获取父节点 
var parent = div1.parentElement

// 获取子节点
var child = div1.childNodes

// 删除节点
div1.removeChild(child[0])

```

### 题目
> DOM是哪种数据结构

树结构
> DOM操作常用的API

参考上面

> DOM节点Attribute和property有何区别
- property只是一个JS对象的属性的修改
- Attribute是对html便签属性的修改

