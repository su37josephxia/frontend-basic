# Nginx配置

### 查看配置文件位置

```bash
nginx -t 
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 重启

```js
service nginx restart
```

### 重载配置文件

```bash
nginx -s reload
```



### 静态资源



### 反向代理

```bash
#  /node_proxy
upstream node_proxy{   #这里ubuntu可以为其他自定义字符串，下方需要填写对应字符串
    server 127.0.0.1:3000;  #3000为需要转发的端口号
}
server{
    listen 80;  #90为转发到的端口号
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://node_proxy;  #与上方对应
        proxy_redirect off;
    }
}
```



### Websocket.io支持

```bash
location ~* \.io {
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header Host $http_host;
	proxy_set_header X-NginX-Proxy true;
 
	proxy_pass http://localhost:3000;
	proxy_redirect off;
 
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "upgrade";
}
```



### 添加WWW跳转

> 浏览器 xxx.com ->  www.xxx.com



### HTTPS支持

> 安全通讯的传输协议
>
> - 网站服务器的身份认证
> - 保护交换数据的的隐私和完整性
> - 防止人为攻击
> - 运营商劫持
> - 新特性 WebRTC 、Service Worker的前台要素

