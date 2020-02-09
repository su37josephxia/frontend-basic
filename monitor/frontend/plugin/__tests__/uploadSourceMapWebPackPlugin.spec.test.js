const Upload = require('../uploadSourceMapWebPackPlugin')
it('Plugin Upload Test', async () => {
    const upload = new Upload()
    const list = [
        '/Users/xia/source/frontend-basic/monitor/frontend/vue-sample/dist/js/chunk-vendors.327f60f7.js.map',
        '/Users/xia/source/frontend-basic/monitor/frontend/vue-sample/dist/js/app.6fa2da46.js.map'
    ]
    for (let filename of list) {
        await upload.upload('http://localhost:7001/monitor/sourcemap', filename)
    }
    // await upload.upload('http://localhost:7001/monitor/sourcemap',
    // '/Users/xia/source/frontend-basic/monitor/frontend/vue-sample/dist/js/chunk-vendors.327f60f7.js.map')
});