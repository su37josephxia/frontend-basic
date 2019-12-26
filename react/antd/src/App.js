import React, { Component } from 'react'
// import Button from 'antd/lib/button'
// import "antd/dist/antd.css"

import {Button} from 'antd'
import AntForm from './component/AntForm'
import KForm from './component/KFormTest'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Button type="primary">Button</Button> */}
        {/* <AntForm></AntForm> */}
        <KForm></KForm>
      </div>
    )
  }
}
export default App