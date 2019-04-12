# Ajax-XMLHttpRequst

### 知识点
> XMLHttpRequest
```js
    var xhr = new XMLHttpRequest()
    xhr.open("GET","/api",false)
    xhr.onreadystatechange = fucntion() {
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                alert(xhr.responseText)
            }
        }
    }
    xhr.send(null)
```
- IE低版本使用ActiveXObject

> 状态码
- 2xx - 表示成功处理请求
- 3xx - 需要重定向 浏览器直接跳转
- 4xx - 客户端请求错误
- 5xx - 服务器端错误

> 跨域
- 设么是跨域
    - 浏览器有同源策略 不允许ajax方位其他域接口
    - 跨域条件：协议 域名 端口 有一个不同就算跨域
    - 可以跨域的三个标签
        - img标签 （服务器不做防止盗链处理的情况下） -> 可以做打点统计 兼容性好
        - link标签 -> 使用CDN
        - script标签 -> JSONP CDN

- JSONP
```html
    <script>
        window.callback = functiion (data){
            console.log(data)
        }
    </script>
    <script src="http://xxx.xxx/api.js" /> 
```

- 服务器设置Header
```js
// 允许跨域
res.setHeader("Access-Control-Allow-Origin", "*"); 
res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 允许跨域cookie
res.setHeader("Access-Control-Allow-Credentials","true")

```


### 题目
> 手动编写一个ajax 不依赖第三方库
```js
    var xhr = new XMLHttpRequest()
    xhr.open("GET","/api",false)
    xhr.onreadystatechange = fucntion() {
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                alert(xhr.responseText)
            }
        }
    }
    xhr.send(null)
```

> 跨域的集中实现方式
- JSONP
- 服务器端设置HTTP HEADER