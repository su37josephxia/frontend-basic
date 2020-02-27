// 查看PATH
console.log(process.env.PATH.split(':').join('\n'));


console.log(`arch:${process.arch}`)
console.log(`platform:${process.platform}`)
console.log(`获取内存使用情况 memoryUsage:${process.memoryUsage()}`)
console.log(`获取命令行参数 argv:${process.argv}`)