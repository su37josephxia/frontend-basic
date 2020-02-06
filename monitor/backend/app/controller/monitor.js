'use strict';

const Controller = require('egg').Controller;
const { getOriginSource } = require('../utils/sourcemap')
const fs = require('fs')
const path = require('path')

class MonitorController extends Controller {
  async index() {
    console.log
    const { ctx } = this;
    const { info } = ctx.query
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('fronterror:', json)
    this.ctx.getLogger('frontendLogger').error(json)
    ctx.body = '';
  }

  getInfo(info) {
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('frontendLogger', json)
    // 打印前端日志
    this.ctx.getLogger('frontendLogger').error(json)

    // 获取source文件名
    // if (json.filename) {
    //   const filename = json.filename.slice(json.filename.lastIndexOf('/') + 1)
    //   getOriginSource(path.join(this.config.baseDir, 'uploads'))(filename, json.lineno, json.colno)

    // }

  }

  async upload() {
    const { ctx } = this
    const stream = ctx.req
    const filename = ctx.query.name
    console.log('filename ', filename)
    const dir = path.join(this.config.baseDir, 'uploads')
    // 判断upload目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const target = path.join(dir, filename)
    console.log('target..', target)
    const writeStream = fs.createWriteStream(target)
    stream.pipe(writeStream)
  }
}

module.exports = MonitorController;
