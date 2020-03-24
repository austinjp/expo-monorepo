# expo-monorepo

An expo monorepo boilerplate using lerna and yarn workspaces for creating react native apps.

## Prerequisites

You need to install [watchman](https://facebook.github.io/watchman/)

## Installation

1. Run `yarn`
1. You may need to run the following, see <https://github.com/yarnpkg/yarn/issues/7807#issuecomment-584598567> for a relevant discussion around problems with yarn workspaces, and why `npx yarn@1.19.1` is sometimes used instead of plain `yarn`. It seems that `react-native-safe-area-view` might be to blame here.
    - `npx yarn@1.19.1 workspace device add @react-native-community/masked-view@=0.1.5` (Note, masked-view version 0.1.5 is compatible with expo 3.15.5, you may be able to use a later version.)
    - `yarn -W add react-native-gesture-handler`
    - `yarn -W add react-native-safe-area-context`
    - `npx yarn@1.19.1 workspace device add @react-navigation/stack`
    - `yarn -W add @react-navigation/compat`
    - `npx yarn@1.19.1 workspace device add @react-navigation/bottom-tabs expo-web-browser`
    - `npx yarn@1.19.1 workspace web add babel-preset-expo`
    - `npx yarn@1.19.1 workspace web add -D webpack webpack-cli webpack-dev-server path graceful-fs`
    - `yarn -W add -D webpack webpack-cli webpack-dev-server path graceful-fs`
    - You may also need to ensure compatible versions of React and React Native are used. Some deps install other versions. Good luck!
        - `yarn -W remove react ; npx yarn@1.19.1 -W add 'react@16.9.0'`
        - `yarn workspace device remove react ; npx yarn@1.19.1 workspace device add 'react@16.9.0'`
1. Run `yarn device:start --clear --lan` for Android build, or `yarn web:build-prod` or `yarn web:build-dev` for web builds.

## Trouble-shooting

### React and React Native compatibility

The versions of React and React Native need to be compatible. Check what the React Native team use with their [upgrade helper tool](https://react-native-community.github.io/upgrade-helper/?from=0.61.0&to=0.62.0-rc.0).

Check what you have installed with something like the following:

```
grep '"react-native"' package.json packages/*/package.json
grep '"react"' package.json packages/*/package.json
```
