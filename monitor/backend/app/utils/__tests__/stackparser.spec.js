const StackParser = require('../stackparser')
const { resolve } = require('path')
const error = {
    stack: 'ReferenceError: xxx is not defined\n' +
        '    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392',
    message: 'Uncaught ReferenceError: xxx is not defined',
    filename: 'http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js'
}

it('stackparser on-the-fly', async () => {

    const stackParser = new StackParser(__dirname)
    console.log('Stack:',error.stack)
    const stackFrame = stackParser.parseStackTrack(error.stack, error.message)
    stackFrame.map(v => {
        console.log('stackFrame', v)
    })
    const originStack = await stackParser.getOriginalErrorStack(stackFrame)

    console.log('originStack',originStack)

    // 断言 
    expect(originStack[0]).toMatchObject(
        {
            source: 'webpack:///src/index.js',
            line: 24,
            column: 4,
            name: 'xxx'
        }
    )
})
