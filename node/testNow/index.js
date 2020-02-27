const fs = require('fs')
const path = require('path')
module.exports = class TestNow {
    static genJestSource(sourcePath = resolve('./')) {
        const testPath = `${sourcePath}/__test__`
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件
        let list = fs.readdirSync(sourcePath)

        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码
            .filter(v => v.indexOf('.spec') === -1)
            .map(TestNow.genCode)
    }
    static genCode(filename) {

        console.log('filename:' + filename)

        // const testSousrceName =
        // testSourceName = `${dirname(filename)}/__test__/${basename(filename)}`

        // 判断是否存在此文件
        if (fs.existsSync(filename)) {
            return
        }

        const module = require(filename)
        if (typeof module === 'object') {

            const ary = Object.keys(module).forEach(genCase)
            fs.writeFileSync(filename, ary.join('\n'))
        } else if (typeof module == 'function') {
            genCase(basename(filename).replace('.js', ''))
        }
    }

    static genCase(method) {
        console.log('case ', method)

        const template = `
            test('${'TEST ' + method}',() => {
                const ${method} = ${method}()
            })
        `
        return template
    }

    /**
     * 生成测试文件名
     * @param {*} filename 
     */
    static getTestFileName(filename) {
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename)
        const extname = path.extname(filename)
        const testName = baseName.replace(extname, `.spec${extname}`)

        return path.format({
            dir: dirName,
            base : testName
        })
    }
}









