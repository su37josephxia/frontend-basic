'use strict';

const Controller = require('egg').Controller;
const { getOriginSource } = require('../sourcemap')

class MonitorController extends Controller {
  async index() {
    const { ctx } = this;
    this.getInfo(ctx.query.info)
    ctx.body = '';
  }

  getInfo(info) {
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'))
    console.log('json', json)

    const filename = json.filename.slice(json.filename.lastIndexOf('/') + 1)
    console.log('filename',filename)
    getOriginSource(filename, json.lineno, json.colno)
  }
}

module.exports = MonitorController;
