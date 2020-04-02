const originRequest = require("request");
const cheerio = require("cheerio");
const fs = require('fs-extra')
function request(url, callback) {
  const options = {
    url: url,
    encoding: null
  };
  originRequest(url, options, callback);
}

const getDate = () => {
  const url = `https://juejin.im/user/593e0a32a0bb9f006b560bad`;
  request(url, function (err, res, body) {
    const $ = cheerio.load(body);

    const data = {
      praise: $($(".content .count")[0]).text(),
      views: $($(".content .count")[1]).text().replace(',',''),
      createDate: new Date()
    }
    console.log(data);

    fs.appendFile(__dirname + '/juejin.log', JSON.stringify(data) + '\n')

  })
}


const schedule = require("node-schedule");
// 每十分钟

const interval = '0  0  */1  *  *  ?'
schedule.scheduleJob(interval,() => {
  console.log('run '+ new Date())
  getDate()
})