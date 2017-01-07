# Electron Simple Desktop Notifier

A simple way to POST desktop notifications via a REST API.
The application is build using Electron.

## Usage
When the application is running (default port is 9000).
A notification can be send to that desktop over REST. Example using POSTMAN:
![Postman](http://imgur.com/zlfyfrJ.png)

When the call is made the notification will be send and looks something like (on Windows 10):
![Notification](http://imgur.com/bnbFNGn.png)

** Note: ** The port can be changed by right clicking the icon in the tray and clicking into *Settings*.
![Tray](http://i.imgur.com/hwDxIGD.png)

The notifications are send using [node-notifier](https://www.npmjs.com/package/node-notifier).
As a result the same json structure can be used to send a notification with the exception of the icon and contentImage fields for example:
```javascript
{
  'title': void 0,
  'subtitle': void 0,
  'message': void 0,
  'sound': false, // Case Sensitive string for location of sound file, or use one of OS X's native sounds
  'icon': 'Terminal Icon', // Absolute Path to Triggering Icon
  'contentImage': void 0, // Absolute Path to Attached Image (Content Image)
  'open': void 0, // URL to open on Click
  'wait': false // Wait for User Action against Notification
}
```

## How to run app

1. Navigate into project directory `cd electron-simple-notifier`

2. Download Project dependencies `npm i`

3. Run the sample via `electron .`

## License

Electron Simple Desktop Notifier is published under the Apache v2 license. See `LICENSE` for details.
