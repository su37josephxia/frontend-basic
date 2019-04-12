# defineProperty的用法详解

- 句法
```
Object.defineProperty(obj, prop, descriptor)
```
参数
- obj：要在其上定义属性的对象。
- prop：要定义或修改的属性的名称。
- descriptor：正在定义或修改的属性的描述符。
- 返回值 传递给函数的对象

> 添加属性和默认值
``` js
var o = {}; // 创建一个新对象

Object.defineProperty(o, "a", {

    __proto__: null,
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true
});
```

> 设置和修改属性
```js
var bValue;

Object.defineProperty(o, "b", {

    get : function(){ return bValue; },
    set : function(newValue){ bValue = newValue; },

    enumerable : true,
    configurable : true
});
o.b = 18;
```

> 视图控制器
```html
  <div>
    <p>你好，<span id='nickName'></span></p>
    <div id="introduce"></div>
  </div>　
  <script>
        //视图控制器
        var userInfo = {};
        Object.defineProperty(userInfo, "nickName", {
            get: function(){
                return document.getElementById('nickName').innerHTML;
            },
            set: function(nick){
                document.getElementById('nickName').innerHTML = nick;
            }
        });

        Object.defineProperty(userInfo, "introduce", {
            get: function(){
                return document.getElementById('introduce').innerHTML;
            },
            set: function(introduce){
                document.getElementById('introduce').innerHTML = introduce;
            }
        });

        //数据
        //todo 获取用户信息的代码

        userInfo.nickName = "张无忌";
        userInfo.introduce = "九阳神功护体"
    </script>
```

> Object.defineProperty实现简单的双向绑定
``` html
<!DOCTYPE html>  
<html lang="en">  
    <head>  
        <meta charset="utf-8">  
        <style type="text/css">  
            .box{  
                width: 200px;background-color: skyblue;  
            }  
            img{  
                display: block;  
            }  
        </style>  
    </head>  
    <body>  
       <input type="text" id="btn"  />  
       <p></p>  
   
       <script type="text/javascript">  
            let obj ={};  
            let temp = {};  
            document.getElementById('btn').onkeyup = function(){  
                obj.name = document.getElementById('btn').value;  
            }  
            Object.defineProperty(obj,'name',{  
                get(){  
                    return 1 
                },  
                set(val){  
                    temp['name'] = val;  
                    document.querySelector('p').innerHTML = temp['name'];  
                }  
            })  
               
       </script>  
          
    </body>  
</html>
```