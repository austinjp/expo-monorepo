import { React, h, Component, render, Fragment } from "shared/lib/react-preact"
import { diversify } from "shared/lib/diversify"

class Text extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    return diversify({element:"text",props:this.props})
  }
}

export default Text
export { Text }
