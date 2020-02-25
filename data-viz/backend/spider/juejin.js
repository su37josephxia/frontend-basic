const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

function request(url, callback) {
  const options = {
    url: url,
    encoding: null
  };
  originRequest(url, options,callback);
}

  const url = `https://juejin.im/user/593e0a32a0bb9f006b560bad`;
  request(url, function(err, res, body) {
    const html = iconv.decode(body, "gb2312");
    const $ = cheerio.load(html);
    console.log($(".title_all h1").text());
  });
}