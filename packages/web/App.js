import { React, h, Component } from "shared/lib/react-preact"
import { Test } from "shared/component"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Test />
  }
}

export default App
export { App }
