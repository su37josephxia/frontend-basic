import React, { Component } from 'react'
import { Input, Button } from 'antd'

// 创建高阶组件
function kFormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.options = {}

        }

        validateFields = (field) => {
            console.log('validateFields....', this.state)
            console.log('state', this.state)
            console.log('options', this.options)

            // 获取校校验项的值
            const { rules } = this.options[field]
            const ret = rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {
                        this.setState({
                            [field + 'Message']: rule.message
                        })
                        return true
                    }
                }
                return false
            })

            // 若校验成功 清理错误信息
            if (ret) {
                this.setState({
                    [field + 'Message']: ''
                })
            }
            return ret
        }

        // 变更处理
        handleChange = (e) => {
            const { name, value } = e.target
            this.setState({
                [name]: value
            }, () => {
                this.validateFields(name)
            })
        }

        getFieldDec = (field, option) => {
            this.options[field] = option

            // 高阶组件
            return InputComp => {
                return (
                    <div>
                        {
                            React.cloneElement(InputComp, {
                                name: field,
                                value: this.state[field] || '',
                                onChange: this.handleChange
                            })
                        }
                    </div>
                )
            }
        }
        render() {
            return (
                <Comp {...this.props}
                    getFieldDec={this.getFieldDec}
                    validateFields={this.validateFields}
                >
                </Comp>
            )
        }
    }
}

// 写法一

@kFormCreate
class KFormTest extends Component {
    onLogin = () => {
        this.props.validateFields()
    }

    render() {
        return (
            <div>
                    {this.props.getFieldDec(
                        'username',
                        {
                            rules: [{ required: true, message: '请输入用户名' }]
                        }
                    )(
                        <Input type="text" />
                    )}

                    <Input type="password" />
                    <Button onClick={this.onLogin}>KFrom</Button>
            </div>
        )
    }
}

export default KFormTest