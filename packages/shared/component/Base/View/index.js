import { React, h, Component, render } from "shared/lib/react-preact"
import { diversify } from "shared/lib/diversify"

class View extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    const styles = (this.props || {}).style || {}
    return diversify({props:this.props,styles:styles})
  }
}

export default View
export { View }
