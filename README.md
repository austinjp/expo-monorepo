# expo-monorepo

An expo monorepo boilerplate using lerna and yarn workspaces for creating react native apps.

NOTE: VERY ALPHA. DO NOT USE.

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


## Ejecting Expo

Running `yarn workspace device expo eject` makes Expo generate files in two folders, and means _Expo can no longer be used to manage the project_. The two folders contain the files necessary to build Android and iOS versions of the app with the usual tools instead of Expo (Android Studio for Android, and Xcode for iOS).

**Warning**: to develop iOS apps with Xcode you **need**:

- a Mac running the latest supported version of Mac OS, or possibly a "cloud" Mac from somewhere like <https://macincloud.com>
- Xcode
- an Apple developer account at <https://developer.apple.com>

All of the above cost money. If you cannot access these items, you will probably need to continue using Expo for iOS development.

Xcode is required to do the following:

- Upload your app to the Apple app store.
- Generate the required .p12 certificate files.

Expo provides iOS builds, and can (apparently) upload apps to the app store. However, the apps will be reasonably large since they require the Expo wrapper code which allows JavaScript apps to run. Expo comes bundled with a load of APIs by default, and these are bundled into the generated app. Expo also does things like certificate provisioning automatically, which makes things simpler than doing it yourself.

After running `yarn workspace device expo eject` you will be prompted to answer three questions. For the first multiple-choice option, select "Bare: I'd like a bare React Native project". The next two just ask you to name your app.


### Undoing Expo eject

You can undo the Expo eject using git, as shown here. **Be aware** this will rollback **all** changes since your last commit (and only _up to_ that commit) so **be careful**.

```sh
git clean --force && git reset --hard
```

### Folders

Running `yarn workspace device expo eject` will generate files in the following folders:

```
packages/device/android
packages/device/ios
```

The contents of these folders are **ignored** by Git using the `.gitignore` files in those directories.

### After ejecting....

It seems that a *LOT* of work is required after ejecting. *Sigh*. My attempts are documented in [after-ejecting.md](after-ejecting.md). This is very much a work in progress!


## Trouble-shooting

### React and React Native compatibility

The versions of React and React Native need to be compatible. Check what the React Native team use with their [upgrade helper tool](https://react-native-community.github.io/upgrade-helper/?from=0.61.0&to=0.62.0-rc.0).

Check what you have installed with something like the following:

```sh
grep '"react-native"' package.json packages/*/package.json
grep '"react"' package.json packages/*/package.json
```

## Apple Developer

Ensure the "identifier" for your app in the [Apple Developer dashboard](https://developer.apple.com/account) exactly matches the strings `expo.android.package` and `expo.ios.bundleIdentifier` defined in `packages/device/app.json`.


## Expo

To get started, try the following:

```sh
expo login
```

Then authenticate with Apple when starting the iOS build as below. **NOTE** the option `--clear-credentials` will *DELETE* your credentials stored on Apple servers. Only add this if necessary!

```sh
pushd packages/device ; expo build:ios --clear-credentials --apple-id my@appleId.com ; popd
```

To troubleshoot, try adding `EXPO_DEBUG=true`:

```sh
pushd packages/device ; EXPO_DEBUG=true expo build:ios --clear-credentials --apple-id my@appleId.com ; popd
```


Then you should be able to run these:

```sh
yarn device:android build
# yarn device:ios build # Not yet implemented :(
```

# TODO

- `yarn device:ios build` script
- `yarn all` scripts
- Eject Expo and [reduce bundle sizes](https://medium.com/@aswinmohanme/how-i-reduced-the-size-of-my-react-native-app-by-86-27be72bba640)
