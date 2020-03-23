# expo-monorepo

An expo monorepo boilerplate using lerna and yarn workspaces for creating react native apps. 

## Prerequisites

You need to install [watchman](https://facebook.github.io/watchman/)

## Installation

1. Run `yarn`
1. You may need to run the following, see <https://github.com/yarnpkg/yarn/issues/7807#issuecomment-584598567> for a relevant discussion around problems with yarn workspaces.
    - `npx yarn@1.19.1 workspace device add @react-native-community/masked-view@=0.1.5` (Note, masked-view version 0.1.5 is compatible with expo 3.15.5, you may be able to use a later version.)
    - `yarn -W add react-native-gesture-handler`
    - `yarn -W add react-native-safe-area-context`
    - `npx yarn@1.19.1 workspace device add @react-navigation/stack`
    - `yarn -W add @react-navigation/compat`
    - `npx yarn@1.19.1 workspace device add @react-navigation/bottom-tabs expo-web-browser`
    - `npx yarn@1.19.1 workspace web add babel-preset-expo`
    - `npx yarn@1.19.1 workspace web add -D webpack webpack-cli webpack-dev-server path graceful-fs`
    - `yarn -W add -D webpack webpack-cli webpack-dev-server path graceful-fs`
1. Run `yarn start --clear --lan`
