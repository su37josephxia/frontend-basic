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
