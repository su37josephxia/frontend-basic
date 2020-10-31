const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const redis = require("redis");
const redisClient = redis.createClient(6379, "localhost");

const wrapper = require("co-redis");
const client = wrapper(redisClient);

client.on("ready", () => {
  console.log("redis ready ...");
});
// 首页路由
const router = new Router();
router.get("/", (ctx) => {
  ctx.response.type = "html";
  ctx.response.body = fs.createReadStream("./index.html");
});

router.get("/createList", async (ctx) => {
  // redis llen
  const num = await client.llen('goods');

  console.log("抢购商品数量:", num);

  // 添加30个商品
  new Array(30).fill().forEach(async (v, i) => {
    await client.rpush('goods', i);
    console.log("添加商品:", i);
  });

  ctx.body = {
    ok: 1,
  };
});

router.get("/clear", async ctx => {
    // 清空商品
    await client.lrange('goods',0,-1)

    

    ctx.body = {
        ok:1
    }
});

/**
 * 秒杀
 */
router.get("/buy", async (ctx) => {
  // 产生一个随机数当做用户id
  const uid = (Math.random() * 9999999).toFixed();
  let pid = await client.lpop(listKey)
  // 判断库存
  if (pid) {
    await client.hset("orders", pid, uid);
    console.log("订单生成",pid, uid);
  }

  ctx.body = { ok: 1 };
});

router.get('/order',async ctx => {
    const orders = await client.hvals('orders')
    ctx.body = {
        orders
    }
})
app.use(router.routes());

// 监听端口
app.listen(3000, () => {
  console.log("listening on *:3000");
});
