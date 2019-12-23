import React, { Component } from 'react'
// import Button from 'antd/lib/button'
// import "antd/dist/antd.css"

import {Button} from 'antd'
import AntForm from './component/AntForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Button type="primary">Button</Button> */}
        <AntForm></AntForm>
      </div>
    )
  }
}
export default App