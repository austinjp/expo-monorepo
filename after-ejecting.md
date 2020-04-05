# After ejecting

An attempt to get native builds working after ejecting.

You can either follow the directions below, or simply copy these files:

```
cp -r patches/files/package/device/* package/device/
```

## Manually editing the files

Edit packages/device/package.json:

  - Revert "name" so it works with `yarn workspace <workspace-name> <etc>`.
  - Revert "version".
  - Remove entry `"packages": [ ... ]`.

Should look something like this, where my yarn workspace is called "device":

```json
{
  "name": "device",
  "main": "__generated__/AppEntry.js",
  "license": "MIT",
  "version": "0.0.1",
  ...
```

You may want to update the `"scripts"` element. Personally I change it from this:

```json
  "scripts": {
    "device:start": "lerna --scope=device run start --stream --",
    "web:start": "lerna --scope=web run start --stream --",
    "web:build-dev": "lerna --scope=web run build-dev --stream --",
    "web:build-prod": "lerna --scope=web run build-prod --stream --",
    "start": "react-native start",
    "ios": "react-native run-ios",
    "android": "react-native run-android"
  },
```

...to this, where my Yarn workspace is called "device":

```json
  "scripts": {
    "start": "react-native start --reset-cache",
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "postinstall": "expo-yarn-workspaces postinstall"
  },
```

Then I can successfully run commands like `yarn workspace device android`.

Note: you'll notice I've added `--reset-cache` to `react-native start`.

Note 2: you may need to run `watchman watch-del-all` before running `yarn workspace <workspace-name> start`.


# Fix unimodules

Unfortunately it looks like there's an issue in the file `gradle.groovy` in the package `react-native-unimodules`. Edit `packages/device/node_modules/react-native-unimodules/gradle.groovy` and look for these lines:

```java
def generateBasePackageList(List<Unimodule> unimodules) {
  def findMainJavaApp = new FileNameFinder().getFileNames(rootProject.getProjectDir().getPath(), '**/MainApplication.java', '')
  def findMainKtApp = new FileNameFinder().getFileNames(rootProject.getProjectDir().getPath(), '**/MainApplication.kt', '')

  if (findMainJavaApp.size() != 1 && findMainKtApp.size() != 1) {
    throw new GradleException("You need to have MainApplication in your project")
  }

  def findMainApp = (findMainJavaApp.size() == 1) ? findMainJavaApp : findMainKtApp
```

Edit to look like this (note the extra final line here):

```java
def generateBasePackageList(List<Unimodule> unimodules) {
  def findMainJavaApp = new FileNameFinder().getFileNames(rootProject.getProjectDir().getPath(), '**/MainApplication.java', '')
  def findMainKtApp = new FileNameFinder().getFileNames(rootProject.getProjectDir().getPath(), '**/MainApplication.kt', '')

  // if (findMainJavaApp.size() != 1 && findMainKtApp.size() != 1) {
  //   throw new GradleException("You need to have MainApplication in your project")
  // }

  // def findMainApp = (findMainJavaApp.size() == 1) ? findMainJavaApp : findMainKtApp
  def findMainApp = findMainJavaApp
```

# Fix Java source

Edit `packages/device/android/app/src/main/java/com/test/MainApplication.java` and add this near the top (where `device` is the same as your workspace/app name):

```java
import com.device.BuildConfig;
```

# Remove unimodules

Comment out any mention of unimodules from these files; this should be around 2-3 lines per file:

```
packages/device/android/settings.gradle 
packages/device/android/app/build.gradle
```

# Upgrade react-navigation

```
yarn upgrade 'react-navigation@4.3.7'
yarn upgrade '@react-navigation/compat@5.1.7'
yarn workspace device upgrade 'react-navigation@4.3.7'
yarn workspace device upgrade '@react-navigation/compat@5.1.7'
```

# Fix some deps

```
grep version node_modules/@react-native-community/cli-platform-android/package.json
yarn workspace device add '@react-native-community/cli-platform-android@3.1.4' # check the version number
```


# Hard rebuild!!

```
watchman watch-del-all && pushd ./packages/device/android && ./gradlew --stop ; ./gradlew --no-daemon clean ; popd && yarn workspace device start
```


<!--
# Upgrade gradle wrapper

Check the latest version of Gradle here: <https://docs.gradle.org/current/release-notes.html>

Check the latest version of Android Studio Gradle version here: <https://jcenter.bintray.com/com/android/tools/build/gradle/>

Edit `packages/device/android/build.gradle` to look something like this:

```java

```

Then run:

```sh
pushd packages/device/android
gradlew wrapper --gradle-version=6.3
popd
```
-->

