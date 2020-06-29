# Http-Catch教学模型

## usage
```javascript
app.use(cache({
    refresh: '0 0 0 * * ? *', // 每日0点执行
    prefix:'/api/data', // 优先于urlPattern
    urlPattern: /^\/api\/data\/\w+$/, // url正则匹配 与prefix二选一 如果使用正则匹配时prefix不要配置或者设为’‘
}))

```
## 功能描述
- 对匹配地址中设定的URL进行缓存
- 缓存根据可以定时刷新