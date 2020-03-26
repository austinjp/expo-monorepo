import { React, h, Component, render } from "shared/lib/react-preact"
import { View, Text } from "shared/component/Base"

class Test extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    return (
      <View style={{background:"red",color:"white",height:"100px",display:"block"}}><Text /></View>
    )
  }
}

export default Test
export { Test }
