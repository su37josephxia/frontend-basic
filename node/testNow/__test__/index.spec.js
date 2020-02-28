const fs = require('fs')
beforeEach(() => {
    // 准备环境
    // 删除测试用的生成结果
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true
    })
})

test('测试文件名称',() => {
    const src = new (require('../index'))()
    const ret = src.getTestFileName('/abc/class.js')
    console.log('getSourceName',ret)
    expect(ret)
    .toBe('/abc/__test__/class.spec.js')
})

test('生成测试代码', () => {
    const src = new (require('../index'))()
    const ret = src.getTestSource('fun','class')
    expect(ret)
        .toBe(
            `
test('TEST fun',() => {
    const  fun = require('../class')
    const ret = fun()
    // expect(ret)
    //     .toBe('test ret')
})
        `
        )
})

test('单元测试 测试生成测试代码文件', () => {
    const src = new (require('../index'))()
    mockFn = jest.fn();
    src.genTestFile = mockFn
    src.genJestSource(__dirname + '/data')
    expect(mockFn).toBeCalledTimes(2)
    expect(mockFn).toHaveBeenCalledWith(__dirname + '/data/fun.js')
    expect(mockFn).toHaveBeenCalledWith(__dirname + '/data/class.js')
})


test('单元测试 genTestFile 01 class分支', () => {
    const src = new (require('../index'))()

    const getTestSource = jest.fn();
    src.getTestSource = getTestSource

    const writeFileSync = jest.fn()
    src.fs.writeFileSync = writeFileSync

    src.genTestFile(__dirname + '/data/class.js')
    expect(getTestSource).toBeCalledTimes(2)
})

test('单元测试 genTestFile 02 class分支', () => {
    const src = new (require('../index'))()

    const getTestSource = jest.fn();
    src.getTestSource = getTestSource

    const writeFileSync = jest.fn()
    src.fs.writeFileSync = writeFileSync

    src.genTestFile(__dirname + '/data/fun.js')
    expect(getTestSource).toBeCalledTimes(1)
})




test('集成测试 测试生成测试代码文件', () => {
    const src = new (require('../index'))()
    // 准备环境
    // 删除测试用的生成结果
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true
    })
    src.genJestSource(__dirname + '/data')
})