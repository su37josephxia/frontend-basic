require("./log.js");
const fs = require('fs')
log('同步阻塞')
fs.writeFileSync('./data.json','')
log('同步阻塞')

// 同步非阻塞
// 不存在
