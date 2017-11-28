# Mazdis

# Quick Start Guide
## Get React Native

See "Building Projects with Native Code" tab here: https://facebook.github.io/react-native/docs/getting-started.html

1. Install npm & node.js
2. `npm install -g react-native`
3. `npm install -g react-native-cli`

## Toolchain Setup
1. Get the repository files `git clone`
2. Get required packages `npm install`
3. Link dependancies: `react-native link`
4. See below for Emulator/Physical Device Debugging

## Android Emulator
1. Install Android SDK
2. Set up new virtual device in AVD Manager
3. Set up SDK Manager to include Google Play Services
4. Run Emulator
5. In the project directory `react-native run-android`

## Android Physical Device
1. Connect to device through USB
2. Enable Developer options & USB Debugging
3. In the project directory `react-native run-android`

# Common Issues:
## Map not displaying on Emulator
Create a new AVD with a larger screen size.

## Physical Device: Unable to load scripts from assets 'index.android.bundle' 
See https://github.com/facebook/react-native/issues/15070

## Could not install the app on the device, read the error above for details (android/gradlew permission error)
See https://github.com/facebook/react-native/issues/8868
