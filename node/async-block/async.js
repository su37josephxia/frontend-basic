const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
require("./log.js");
(async () => {
  log("异步阻塞");
  await writeFile("./data.json", "");
  console.log("读取完成....");
  log("异步阻塞End");
})();

log("异步非阻塞");
writeFile("./data.json", "").then(() => {
  console.log("读取完成....");
});
log("异步非阻塞End");
