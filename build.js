// const fs = require('fs-ex')
const {sync} = require('globby')
const fs = require('fs-extra')
const {resolve} = require('path')
const build = async () => {
    // 删除目录
    fs.removeSync('./vuepress/document')

    const files = []
    
    files.push(...sync('./**/*.md',{
        gitignore:true,
        absolute:true
    }))

    files.push(...sync('./**/assets/*',{
        gitignore:true,
        // onlyFiles:false,
        absolute:true
    }))

    files
    .forEach(srcpath => {
        const dstpath = srcpath.replace(resolve('./'),resolve('./vuepress/document/'))
        fs.ensureLinkSync(srcpath, dstpath)
    })
}

build()

// options is optional
// glob("**/*.js", options, function (er, files) {
//     // files is an array of filenames.
//     // If the `nonull` option is set, and nothing
//     // was found, then files is ["**/*.js"]
//     // er is an error object or null.
// })