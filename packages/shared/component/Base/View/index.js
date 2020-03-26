import { React, h, Component, render } from "shared/lib/react-preact"
import { Platform } from "shared/lib/platform"

let _View
if (Platform.device) {
  _View = require("react-native").View
}

import { Text } from "shared/component/Base/Text"

class View extends Component {
  render(props) {
    if (Platform.web) {
      return (
        <div><Text /></div>
      )
    }

    return (
      <_View><Text /></_View>
    )
  }
}

export default View
export { View }
