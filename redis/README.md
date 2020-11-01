# Redis

## 一、什么是Redis

Redis是一个开源（BSD许可）的内存数据结构存储，用作数据库，缓存和消息代理。它支持数据结构，如字符串，散列，列表，集合，带有范围查询的排序集，位图，超级日志，具有半径查询和流的地理空间索引。Redis具有内置复制，Lua脚本，LRU驱逐，事务和不同级别的磁盘持久性，并通过Redis Sentinel提供高可用性并使用Redis Cluster自动分区。

- redis 是由 C 语言写成
- 开源key-value型数据库

## 二、特点

- 速度快，因为数据存在内存中，类似于HashMap，HashMap的优势就是查找和操作的时间复杂度都是O(1)

- 支持丰富数据类型，支持string，list，set，sorted set，hash

- 支持事务，操作都是原子性，所谓的原子性就是对数据的更改要么全部执行，要么全部不执行

- 丰富的特性：可用于缓存，消息，按key设置过期时间，过期后将会自动删除

## 三、应用场景

### 缓存

缓存是redis最常见的应用场景，主要是因为redis读写性能优异，每秒可以处理超过 10万次读写操作，是已知性能最快的Key-Value DB。其次 redis 支持保存多种数据结构，此外单个value的最大限制是1GB，而memcached只能保存1MB的数据。



### 2. 分布式锁

因为redis单线程的这个特性，其中有个很重要的应用场景就是分布式锁。对于高并发的系统，都是用多服务器部署，其中程序进行逻辑处理时就可以用到分布式锁来限制程序的并发。



### 3. 自动过期

redis针对数据都可以设置过期时间，可以自动的去清理过期的数据。常见的应用场景有：短信验证码，活动开始和截止日期等具有时间性的商品展示等



### 4. 计数器和排行榜

redis在内存中对数字进行递增或递减的操作支持很好。集合（Set）和有序集合（Sorted Set）也使得我们在执行这些排行操作的时的非常简单。



### 5. 秒杀的缓冲层

秒杀是现在互联网系统中常见的营销模式，但是通常由于并发太高导致、程序阻塞等原因给开发带来很大困难。可以利用redis单线程的特性来控制并发，可将redis作为缓存平台，由于redis的读写能力很强，所以不易产生程序阻塞现象。



### 6. 处理签到和其他状态（大数据处理）

当用户量庞大时，如何去在极短的时间里去统计用户的状态，签到情况等，如QQ打卡、 查看好友状态等。redis中的**位图**可以很好的解决这个问题。



### 7. 发布/订阅

可以使用redis的发布订阅去实现的社交聊天系统。





## 四、实战

## 1. Redis发布/订阅实现聊天室

```js
const rclient = redis.createClient(6379, 'localhost')
rclient.on("ready", err => {
    console.log('client ready ....');
})

const publish = redis.createClient(6379, 'localhost')
publish.on('ready', err => {
    console.log('publish ready ...')
})

```



```js
io.on('connection', (socket) => {
		// 订阅
    rclient.subscribe('chat')
    // 收到消息后将推送消息
    rclient.on('message', (channel, msg) => {
        io.emit('chat message', msg)
    })
    socket.on('chat message', msg => {
        console.log('receive message:' + msg)
        publish.publish('chat', msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})
```



## 2. Redis队列实现秒杀 秒杀实例

https://www.jianshu.com/p/31f59426c779

#### 2.1 痛点解决

- 短时间内大量并发

- 保证不会超卖

  使用Redi提供缓冲层

  - 内存型数据库性能远优于关系型数据库

  - Redis单进程方式保证操作原子性

  

#### 2.2 使用Redis队列投放秒杀商品

```
router.get("/create", async (ctx) => {

  // 清空商品
  await client.ltrim("goods", -1, 0);

  // 添加30个商品
  new Array(30).fill().forEach(async (v, i) => {
    await client.rpush("goods", i);
    console.log("添加商品:", i);
  });

  // redis llen
  const num = await client.llen("goods");
  console.log("抢购商品数量:", num);

  ctx.body = {
    ok: 1,
  };
});
```



#### 2.3 秒杀从商品队列中取出商品

#### 2.4 使用哈希表作为临时订单

```
router.get("/buy", async (ctx) => {
  // 产生一个随机数当做用户id
  const uid = (Math.random() * 9999999).toFixed();
  let pid = await client.lpop("goods");

  // 判断库存
  if (pid) {
    await client.hset("orders", pid, uid);
    console.log("订单生成", pid, uid);
  }

  ctx.body = { ok: 1 };
});
```

#### 2.5 打印订单列表

```
router.get("/order", async (ctx) => {
  const keys = await client.hkeys("orders");
  console.log('订单列表')
  console.log('===========')
  const orders = await client.hgetall('orders')
  for (k of keys) {
    console.log(`${k} => ${await client.hget("orders", k)}`);
  }

  ctx.body = {
    orders
  };
});
```

#### 2.6 清空订单

```js
router.get('/order/clear',async ctx => {
  const keys = await client.hkeys("orders");
  for (k of keys) {
    console.log(`删除订单: ${k} => ${await client.hdel("orders", k)}`);
  }
  ctx.body = {ok : 1}
})
```

#### 2.7 压力测试验证

```js
(async () => {
  const autocannon = require("autocannon");
  const result = await autocannon({
    url: "http://localhost:3000/buy",
    connections: 100, //default
    pipelining: 1, // default
    duration: 1, // default
  });
  console.log('秒杀完成');

})()

```



## 四、附录

## redis操作

https://juejin.im/post/6844904039340048392