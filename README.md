# Electron Simple Desktop Notifier

A simple way to POST desktop notifications via a REST API.
The application is build using Electron.

## Usage
When the application is running (default port is 9000).
A notification can be send to that desktop over REST. Example using POSTMAN:
![Postman](http://imgur.com/zlfyfrJ)

When the call is made the notification will be send and looks something like (on Windows 10):
![Notification](http://imgur.com/bnbFNGn)

** Note: ** The port can be changed by right clicking the icon in the tray and clicking into *Settings*.
![Tray](http://imgur.com/hwDxIGD)

The notifications are send using [node-notifier](https://www.npmjs.com/package/node-notifier).
As a result the same json structure can be used to send a notification with the exception of the icon and contentImage fields for example:
```json
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
```![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

## How to run app

1. Install Electron via `npm install -g electron@1.4.13`.

2. Navigate into project directory `cd electron-simple-notifier`

3. Download Project dependencies `npm i`

2. Run the sample via `electron electron-simple-notifier`.

## License

Electron Simple Desktop Notifier is published under the Apache v2 license. See `LICENSE` for details.
