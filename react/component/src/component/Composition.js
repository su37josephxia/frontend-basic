import React from 'react'

function Dialog(props) {
    const messages = {
        foo: { title: 'foo', content: 'foo~~' }
    }
    const { def, footer } = props.children(messages[props.msg])

    return (
        <div style={{ border: '10px solid blue' }}>
            {def}
            <div>
                {footer}
            </div>
        </div>
    )
}

export default function Composition() {
    return <div>
        <Dialog msg='foo'>
            {
                ({ title, content }) => ({
                    def: <div>
                        <h1>{title}</h1>
                        <h1>组件复合 {title}</h1>
                        <p>复合组件的外观行为</p>
                    </div>,
                    footer: <button onClick={() => alert('abc')}>确定</button>
                })
            }
        </Dialog>
    </div>
}