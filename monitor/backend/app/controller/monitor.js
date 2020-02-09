'use strict';

const Controller = require('egg').Controller;
const StackParser = require('../utils/stackparser')
const fs = require('fs')
const path = require('path')

class MonitorController extends Controller {
  async index() {
    console.log
    const { ctx } = this;
    const { info } = ctx.query
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('fronterror:', json)

    // 转换为源码位置
    const stackParser = new StackParser(path.join(this.config.baseDir, 'uploads'))
    const stackFrame = stackParser.parseStackTrack(json.stack, json.message,'abc')
    console.log('stack:',json.stack,'abc')
    const originStack = await stackParser.getOriginalErrorStack(stackFrame)
    this.ctx.getLogger('frontendLogger').error(json, originStack)

    // this.parseStackTrack(json.stack, json.message)
    ctx.body = '';
  }

  // /**
  //  * 错误堆栈反序列化
  //  * @param {*} stack 错误堆栈
  //  */
  // parseStackTrack(stack, message) {
  //   console.log('$$$getError:', stack)
  //   const error = new Error(message)
  //   error.stack = stack
  //   const stackFrame = ErrorStackParser.parse(error)
  //   stackFrame.map(v => {
  //     console.log('stackFrame', v)
  //   })
  //   const stackFrame = stackParser.parseStackTrack(error.stack, error.message)
  //   const originStack = await stackParser.getOriginalErrorStack(stackFrame)
  //   // console.log('origin-stack',str)
  //   return stackFrame
  // }

  async upload() {
    const { ctx } = this
    const stream = ctx.req
    const filename = ctx.query.name
    const dir = path.join(this.config.baseDir, 'uploads')
    // 判断upload是否存在
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir)
    }
    const target = path.join(dir ,filename)
    console.log('writeFile:',target)
    const writeStream = fs.createWriteStream(target)
    stream.pipe(writeStream)
  }

}

module.exports = MonitorController;
