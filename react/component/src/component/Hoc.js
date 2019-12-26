import React from 'react'

const Text = props => (
    <div>{props.format(props.children)} - {props.data}</div>
)

const withFormat = Comp => props => {
    const format = text => `[${text}]`
    const data = `>>>>>`
    return <Comp {...props} format={format} data={data} />
}

const withColor = color => Comp => props => (
    <div style={
        { color }
    }>
        <Comp {...props}></Comp>
    </div>
)


const MyText = withColor('red')(withFormat(Text))

export default () => (
    <div>
        <MyText>ABC</MyText>
    </div>
)
