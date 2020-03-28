import { React, h, Component, render } from "shared/lib/react-preact"
import { View, Text } from "shared/component/Base"

class Test extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"stretch"}}>
        <View style={{flex:1,backgroundColor:"#ff0"}}>
          <Text style={{color:"#f00"}}>Woot?</Text>
        </View>
      </View>
    )
  }
}

export default Test
export { Test }
