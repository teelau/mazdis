# Mazdis

# Quick Start Guide
## Get React Native
1. Install npm & node.js
2. `npm install -g react-native`
3. `npm install -g react-native-cli`

## Windows + Android Setup
1. Get the repository files `git clone`
2. Get required packages `npm install`
3. See below for Emulator/Physical Device Debugging

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
