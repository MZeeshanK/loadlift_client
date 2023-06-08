# SETUP

## installing dependencies

run `npm install` to install dependencies

## setting android sdk

Create a file with filename `local.properties` in `android` directory

Specify the path of the android sdk in `local.properties`

e.g,

```
sdk.dir = /home/<username>/Android/Sdk
```

# Install and run app on a device

### Connect an android device with your system with android debugging switched on. Choose the android auto option when connecting with your system.

Use the command `npm start` to start the application and then press `a` to run on android.

It will automatically install and start on the device connected.
