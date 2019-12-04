# Http-Catch教学模型

## usage
```javascript
app.use(cache({
    refresh: '0 0 0 * * ? *', // 每日0点执行
    urlPattern: /^\/api\/data\/\w+$/, // 匹配地址
}))

```
## 功能描述
- 对匹配地址中设定的URL进行缓存
- 缓存根据可以定时刷新