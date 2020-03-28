import { React, h } from "shared/lib/react-preact"
import { platform } from "shared/lib/platform"

function diversify(o) {

  const props   =  (o || {}).props   || {}
  const styles  =  (o || {}).styles  || {}
  var   element = ((o || {}).element || "view").toLowerCase()

  // FIXME Tidy up styles. Remove units if native?

  props.children ? true : props.children = {}

  let E = element

  if (platform.web) {

    switch(element) {
      case "text":
        E = "span"
        break;
      default:
        E = "div"
    }

  } else if (platform.device) {

    const RN = require("react-native")

    switch(element) {
      case "text":
        E = RN.Text
        break;
      default:
        E = RN.View

    }
  }

  return React.createElement(E,props)
}

export default diversify
export { diversify }
