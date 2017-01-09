const {
    app,
    Tray,
    Menu,
    BrowserWindow
} = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, 'icon.png');
let appIcon = null;
let win = null;
let settingsWindow = null;
let notificationServer = require('esn-notification-server');

// Start the application.
function startApplication() {

    // Create the browser window.
    win = new BrowserWindow({
        show: false
    });
    global.settings.windowSet.add(win);

    // Create the tray.
    createTray(win);

    // Start the notification server.
    notificationServer.listen(global.settings.port);

    // Emitted when the window is closed.
    win.on('closed', () => {
        global.settings.windowSet.delete(win);
    });
}

// Create settings window.
function createSettingsWindow() {
    settingsWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    global.settings.windowSet.add(settingsWindow);
    settingsWindow.loadURL('file://' + __dirname + '/settings.html');

    // Emitted when the window is closed.
    settingsWindow.on('closed', () => {
        global.settings.windowSet.delete(win);
    });
}

// Build the OS tray.
function createTray(win) {
    appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([{
            label: 'Settings',
            click: createSettingsWindow
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

global.settings = {
    port: 38866,
    windowSet: new Set([])
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startApplication);
