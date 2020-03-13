const fs = require('fs-extra');
const os = require('os');
const rl = require('readline');

module.exports.writeLine = (dir, text) => {
    const stream = fs.appendFile(dir,text + '\n')
}


// /**
//  * 按行读写，无读取内容的处理，类似单纯的复制功能
//  * @param {string} readName 
//  * @param {string} writeName 
//  */
// var readWriteFileByLine = function(readName, writeName){
//     var readStream =  fs.createReadStream(readName);
//     var writeStream = fs.createWriteStream(writeName);
//     var readLine = rl.createInterface({
//         input: readStream,
//         output: writeStream,
//         terminal: true
//     })
// }

// /**
//  * 按行读写，中间包涵对读取的行内容的处理
//  * @param {string} readName 
//  * @param {string} writeName 
//  * @param {Function} callback 
//  */
// var readWriteFileByLineWithProcess = function(readName,writeName,callback){
//     var readStream = fs.createReadStream(readName);
//     var writeStream = fs.createWriteStream(writeName);
//     var readLine = rl.createInterface({
//         input: readStream
//     })
//     readLine.on('line',function(line){
//         var rs = callback(line);
//         writeStream.write(rs + os.EOL);
//     })
// }

// exports.readWriteFileByLine = readWriteFileByLine;
// exports.readWriteFileByLineWithProcess = readWriteFileByLineWithProcess
// 　　b. 功能的调用：index.js

// var rwByLine = require('./lib/readWriteFileByLine.js')

// //按行读写，对行做字符替换处理
// var readName = './obj.txt';
// var writeName = './rt.txt';
// rwByLine.readWriteFileByLineWithProcess(readName,writeName,function(line){
//     var rs = line.toString().replace("\\",'\/');
//     return rs;
// })

// //按行读写，无处理
// readName = './obj.txt';
// writeName = './rt1.txt';
// rwByLine.readWriteFileByLine(readName,writeName);