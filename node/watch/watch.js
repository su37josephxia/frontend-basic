const fs = require('fs')
const { spawn } = require('child_process')
const { resolve } = require('path')
function watch() {
    const [cmd, , source, ...argv] = process.argv
    // console.log('abc', cmd, source, argv)
    const childProcess = spawn(cmd, [source, ...argv])
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    const watcher = fs.watch(resolve(__dirname, source), () => {
        console.log('File changed, reloading.')
        childProcess.kill()
        watcher.close()
        watch()
    })
}
watch()

