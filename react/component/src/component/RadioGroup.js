import React from 'react'

function RadioGroup(props) {
    return (
        <div>
            {React.Children.map(props.children, radio => {
                //   要修改虚拟dom
                return React.cloneElement(radio, { name: props.name })
            })}
        </div>
    )
}


function Radio({ children, ...rest }) {
    return (
        <label>
            <input type="radio" {...rest} />
            {children}
        </label>
    )
}

export default function Composition() {
    return <div>
        <RadioGroup>
            <Radio value='vue'>vue</Radio>
            <Radio value='react'>react</Radio>
        </RadioGroup>
    </div>
}