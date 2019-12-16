import { createStore,applyMiddleware } from 'redux'

// 通知 工单 普通对象 
const action = {
    clear: { type: 'clear' },
    add: { type: 'add', payload: 1 },
    asyncAdd : dispatch => {
        setTimeout(() => {
            dispatch({ type: 'add', payload: 4 })
        },1000)
    }
}

// 工厂 纯函数 返回新对象
const reducer = (state = { num: 100 }, action) => {
    switch (action.type) {
        case 'clear':
            return { num: 0 }
        case 'add':
            return { num: state.num + action.payload }
        default:
            return state
    }
}

const logger = ({ dispatch, getState }) => next => action => {
    console.log('start: ' ,action)
    next(action)
    console.log('end: ' ,action)
    return 
}
const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch)
    }
    next(action)
    return 
}

const store = createStore(
    reducer,
    applyMiddleware(...[
        thunk,
        logger,
    ])
)



// 消息订阅
// state 只读
console.log('init:', store.getState())
store.subscribe(() => console.log('update ...' , store.getState()))
store.subscribe(() => console.log('update2 ...' , store.getState()))

store.dispatch(action['clear'])
store.dispatch(action['add'])
store.dispatch(action['asyncAdd'])
// action['asyncAdd'](store.dispatch)