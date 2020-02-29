test('测试Export', () => {
    const ret = require('../index')
    console.log('export', ret)
    expect(ret)
        .toBe('helloworld')
})

