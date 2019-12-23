import React from 'react'



function Lesson(props) {
    return (
        <div>
            {props.stage} - {props.title}
        </div>
    )
}

const data = [
    { stage: 'React', title: '核心API' },
    { stage: 'React', title: '组件化1' },
    { stage: 'React', title: '组件化2' },
]

const withContent = Comp => props => {
    const content = data[props.idx]
    return <Comp {...content} />
}

const LessonWithContent = withContent(Lesson)

export default function HocTest() {
        return (
            <div>
                {[0, 0, 0].map((item, idx) => (
                    <LessonWithContent key={idx} idx={idx} ></LessonWithContent>
                ))}
            </div>
        )
    }

// 定义高阶组件withContent
// 包装后的组件 传入参数 根据参数获取显示数据

const withLog = Comp => {
    return class extends React.Component {
        render() {
            return <Comp {...this.props}></Comp>
        }
        componentDidMount() {
            console.log('didMount:', this.props)
        }
    }
}

// 组件 withLog


// 包装
// const LessonWithContent = withContent(withLog(Lesson))

// @withContent
// @withLog
class Lesson2 extends React.Component {
    render() {
        return (
            <div>
                {this.props.stage} - {this.props.title}
            </div>
        )
    }
}

// export default function HocTest() {
//     return (
//         <div>
//             {[0, 0, 0].map((item, idx) => (
//                 // <LessonWithContent key={idx} idx={idx} />

//                 <Lesson2 key={idx} idx={idx}></Lesson2>
//             ))}
//         </div>
//     )
// }