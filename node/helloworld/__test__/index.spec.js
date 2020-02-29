test('测试Hello World',() => {
    const ret = require('../index')
    // console.log('hellworld',helloworld)
    expect(ret)
        .toBe('Hello world')
})