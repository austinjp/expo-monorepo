import { React, h, Component, render } from "shared/lib/react-preact"

// Filthy. Since our web package aliases React to Preact, the React secret
// internals will not exist in the web package. They will only exist in the
// device package, which uses React Native and which in turn uses the true React.
var isDevice = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED ? true : false

const platform = {
  web: ! isDevice,
  device: isDevice,
}

export default platform
export { platform }
