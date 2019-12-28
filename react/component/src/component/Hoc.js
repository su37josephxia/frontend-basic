


import React from 'react'
// const add = (x, y) => x + y
// console.log(`add: ${add(1, 2)}`)

// // const format = fn => (...args) => `[ ${fn(...args)} ]`

// const format = (front , end) => fn => (...args) => `${front}${fn(...args)}${end}`

// const myAdd = format('【','】')(add)
// console.log(`myAdd: ${myAdd(1, 2)}`)

const add = (x, y) => x + y
console.log(`add: ${add(1, 2)}`)

// 高阶函数
// const format = fn => (...args) => `[${fn(...args)}]`

// const format = fn => (...args) => `[${fn(...args)}]`

const format = (front, end) => fn => (...args) => `${front}${fn(...args)}${end}`
const myAdd = format('【','】')(add)
console.log(`format: ${myAdd(1, 2)}`)


const Text = props => (
    <div>{props.format(props.children)} - {props.data}</div>
)

// const withFormat = Comp => props => {
//     return <Comp>[ {props.children} ]</Comp>
// }

const withFormat = Comp => props => {
    const format = text => `[${text}]`
    const data = '>>>>'
    return <Comp {...props} format={format} data={data} ></Comp>
}

// const withColor = Comp => props => (
//     <div style={{ color : red }}>
//         <Comp {...props}></Comp>
//     </div>
// )

const withColor = color => Comp => props => (
    <div style={{ color }}>
        <Comp {...props}></Comp>
    </div>
)

// const MyText = withFormat(Text)
const MyText = withColor('blue')(withFormat(Text))

export default () => (
    <div>
        <MyText>ABC</MyText>
    </div>
)