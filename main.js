const {
    app,
    Tray,
    Menu,
    BrowserWindow
} = require('electron');
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

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
    registerNotificationEndpoints();
}

// Builds the notification endpoint who will listen for notifications and create a system notification from it
function registerNotificationEndpoints() {
    notificationListener.use(bodyParser.json());
    var pjson = require('./package.json');
    for (dependency in pjson.dependencies) {
        // Find REST endpoint modules and load them so they can be used to register endpoints
        if (dependency.indexOf('esnrest-') === 0) {
            var endpoints = require(dependency);
            if (typeof endpoints.registerEndpoints == 'function') {
                console.log("Loaded module " + dependency);
                endpoints.registerEndpoints(notificationListener, app);
            } else {
                console.log("Failed to register module: " + dependency + " as it is missing required function registerEndpoints(api, app)");
            }
        }
    }
}
