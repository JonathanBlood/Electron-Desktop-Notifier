# Electron Simple Desktop Notifier
<p align="center">
  <img src="http://i.imgur.com/3OloOtt.png" alt="Logo"/>
</p>

A simple way to POST desktop notifications via a REST API.
The application is build using Electron.

[Download the latest release](https://github.com/JonathanBlood/Electron-Desktop-Notifier/releases)

**Note:** When the application is installed it will appear in the tray. No action is required to get it running. Just follow the steps in the usage section to POST notification!

## Usage
When the application is running (default port is 9000).
A notification can be send to that desktop over REST. Example using POSTMAN:
![Postman](http://imgur.com/zlfyfrJ.png)

CURL example:
```bash
curl -H "Content-Type: application/json" -X POST -d '{"title" : "Hello world!","message" : "Sandwiches"}' http://localhost:38866/notification
```

When the call is made the notification will be send and looks something like (on Windows 10):
![Notification](http://i.imgur.com/7wUxaMI.png)

**Note:** The port can be changed by right clicking the icon in the tray and clicking into *Settings*.
![Tray](http://i.imgur.com/Yr34Yuh.png)

The notifications are send using [node-notifier](https://www.npmjs.com/package/node-notifier).
As a result the same json structure can be used to send a notification with the exception of the icon and contentImage fields for example:
```javascript
{
  'title': void 0,
  'subtitle': void 0,
  'message': void 0,
  'sound': false, // Case Sensitive string for location of sound file, or use one of OS X's native sounds
  'open': void 0, // URL to open on Click
  'wait': false // Wait for User Action against Notification
}
```

## How to run app

1. Navigate into project directory `cd electron-simple-notifier`

2. Download Project dependencies `npm i`

3. Run the sample via `electron .`

## Package for Release
1. Navigate into project directory `cd electron-simple-notifier`

2. Download Project dependencies `npm run-script dist`

3. This will create an installer for Windows in the *dist* folder.

## License

Electron Simple Desktop Notifier is published under the Apache v2 license. See `LICENSE` for details.
