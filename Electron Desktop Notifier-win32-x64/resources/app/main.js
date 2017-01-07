const {
    app,
    Tray,
    Menu,
    BrowserWindow
} = require('electron');
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
const notifier = require('node-notifier');

var ipcMain = require('electron').ipcMain;
const iconPath = path.join(__dirname, 'icon.png');
var notificationListener = express();
let appIcon = null;
let win = null;
let settingsWindow = null;

global.settings = {
    port: 9000
};

// Main application starting point
app.on('ready', function() {
    win = new BrowserWindow({
        show: false
    });
    buildTray(win);
    startNotificationListener();

});


// Build the OS tray
function buildTray(win) {
    appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([{
            label: 'Settings',
            click: function() {
                settingsWindow = new BrowserWindow({
                    width: 800,
                    height: 600
                });
                settingsWindow.loadURL('file://' + __dirname + '/settings.html');
            }
        },
        {
            label: 'Quit',
            click: function() {
                app.quit();
            }
        }
    ]);
    appIcon.setToolTip('Listening for notifications...');
    appIcon.setContextMenu(contextMenu);
}

// Start REST API which contains an endpoint for retrieving notifications
function startNotificationListener() {
    var server = notificationListener.listen(global.settings.port);
    console.log("Listening for notifications on http://localhost:%s", global.settings.port);

    // If port is changed in settings.html page reload server
    ipcMain.on('port-changed', function(event) {
        server.close();
        notificationListener.listen(global.settings.port);
        console.log("Listening for notifications on http://localhost:%s", global.settings.port);
    });
    buildNotificationEndpoint();
}

// Builds the notification endpoint who will listen for notifications and create a system notification from it
function buildNotificationEndpoint() {
    notificationListener.use(bodyParser.json());
    notificationListener.post('/notification', function(req, res) {
        if (!req.body.title || typeof req.body.title != "string" || !req.body.message || typeof req.body.message != "string") {
            res.status(400);
            res.json({
                message: "Failed to send notification."
            });
        } else {
            req.body.icon = path.join(__dirname, 'icon.png');
            notifier.notify(req.body);
            res.status(200);
            res.json({
                message: "Notification send."
            });
        }
    });
}
