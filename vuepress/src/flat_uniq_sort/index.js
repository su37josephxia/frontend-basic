const ary = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

// 循环+递归
// const flatten = input => {
//     result = []
//     input.forEach(v => Array.isArray(v) ? result = result.concat(flatten(v)) : result.push(v))
//     return result
// }

// 归并方法: reduce
//reduce的第二个参数：作为归并基础的初始值
// const flatten = input => input.reduce((prev, next) => prev.concat(Array.isArray(next) ? flatten(next) : next), []);

// ES6：`...`扩展运算符
const flatten = input => {
    while(input.some(v => Array.isArray(v))){
        input = [].concat(...input)
    }
    return input
}


// toString法
// const flatten = ary => ary.toString().split(",").map(v => +v)

// 数组去重
// 简略方法
// const uniq = input => {
//     const result = []
//     input.forEach(v => {
//         result.indexOf(v) === -1 ? (result.push(v)) : 0
//     })
//     return result
// }

// 一般方法
const uniq = input => input.reduce((cur, next, i) => cur.indexOf(next) !== -1 ? cur : [...cur, next], [])



// 对象键值法
// const uniq = input => {
//     const obj = {}
//     return input.reduce((cur, next) => obj[next] ? cur : obj[next] = true && [...cur, next], [])
// }

// 相邻去重法
// const uniq = input => input.sort((a, b) => a > b).reduce((cur, next) => cur[cur.length - 1] === next ? cur : [...cur, next], [])

// Set去重
// const uniq = input => [... new Set(input)]

// 数组下标法
// const uniq = input => input.reduce((cur, next, i) => input.indexOf(next) !== i ? cur : [...cur, next], [])


console.log(uniq(flatten(ary)))

// console.log('ary', [... new Set(ary.flat(Infinity))].sort((a, b) => a - b))


var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
let arr1=[]
let parse = function(arr){
Array.from(arr).forEach(a=>{
typeof a == 'object'?parse(a):(arr1.includes(a)?a:arr1.push(a))
})
}
parse(arr)
arr1=arr1.sort((a,b)=>(a-b))
console.log(arr1)

