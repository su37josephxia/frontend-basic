import React from 'react'

const { Provider, Consumer } = React.createContext()


function withConsumer(Consumer) {
    return Comp => props => {
        return <Consumer>
            {value => <Comp {...value} />}
        </Consumer>
    }
}

const Child = withConsumer(Consumer)(
    function Child(props) {
        return (
            <div onClick={() => props.add()} >{props.counter}</div>
        )
    }
)

export default class ContextTest extends React.Component {
    state = {
        counter: 0
    }

    add = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <Provider value={{ counter: this.state.counter, add: this.add }}>
                <Child />
                <Child />
                <Child />
            </Provider>
        )
    }
}