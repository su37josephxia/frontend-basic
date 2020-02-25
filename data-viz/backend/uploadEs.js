

const fs = require('fs-extra')
const { resolve } = require('path')
const axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:9200';

const job = async () => {
    const dir = resolve(__dirname, '../log/log.json')
    let json
    try {
        json = fs.readJSONSync(dir)
    } catch (e) {
        json = []
    }
    console.log('json', json)

    for await (v of json) {
        console.log('v:', v)
        v.view && (v.intView = parseInt(v.view))
        v.praise && (v.intParse = parseInt(v.praise))

        const res = await axios.post('/job/juejin2',v)
        console.log('res',res)

    }
    // const v = json[0]
    // const res = await axios.post('/job/juejin',v)
    // console.log('axios',res)
}

job()


