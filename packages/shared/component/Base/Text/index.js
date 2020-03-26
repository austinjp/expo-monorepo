import { React, h, Component, render } from "shared/lib/react-preact"
import { Platform } from "shared/lib/platform"

class Text extends Component {
  render(props) {

    const t = "Ok!?"

    if (Platform.web) {
      return (
          <div>{t}</div>
      )
    }

    // var _Text
    // (async () => {
    //   await import("../../../../device/node_modules/react-native").then((m) => { console.log(m) })
    // })()

    let _Text
    if (Platform.device) {
      _Text = require("react-native").Text
    }

    return (
        <_Text>{t}</_Text>
    )
  }
}

export default Text
export { Text }
