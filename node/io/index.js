const fs = require('fs')
const { resolve } = require('path')
exports.readFileSync = () => {
    const result = fs.readFileSync(resolve(__dirname, './text.csv'))
    console.log('text:', result, result.toString())
}

exports.readFile = () => {
    fs.readFile(resolve(__dirname, './text.csv'), (err, result) => {
        console.log('text:', result)
    })
}

exports.promisify = async () => {
    const { promisify } = require('util')
    const readFile = promisify(fs.readFile)
    const result = await readFile(resolve(__dirname, './text.csv'))
    console.log('text:', result.toString())
}

exports.buffer = () => {
    console.log()
}

exports.imageUrl = () => {
    const mime = 'image/png'
    const encoding = 'base64'
    const base64Data = fs.readFileSync(`${__dirname}/image.png`).toString(encoding)
    const uri = `data:${mime};${encoding},${base64Data}`
    // data:image/png;base64,
    fs.writeFileSync(`${__dirname}/index.html`,`<img src='${uri}' />`)
    // console.log(uri)
}