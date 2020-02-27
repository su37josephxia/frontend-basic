const src = require('../index')
// const {resolve} = require('path')

test('测试文件名称',() => {
    const ret = src.getTestFileName('/Users/xia/source/frontend-basic/node/testNow/__test__/class.js')
    console.log('getSourceName',ret)
    
})

test('生成文件夹',() => {
    // src.genJestSource(__dirname)
})