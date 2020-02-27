
const { readFileSync, readFile ,promisify,imageUrl} = require('../index')
describe('IO处理', () => {
    // test('同步读取文件', () => {
    //     readFileSync()
    // })  
    // test('异步读取文件', () => {
    //     readFile()
    // })  

    // test('promisify',async () => {
    //     await promisify()
    // })

    test('生成Base64Url',async () => {
        await imageUrl()
    })
})