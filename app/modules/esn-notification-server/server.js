var express = require('express');
var bodyParser = require('body-parser');
var ipcMain = require('electron').ipcMain;
var notificationListener = express();
const path = require('path');

// Load all endpoint modules.
function loadAllModuleEndpoints() {
    notificationListener.use(bodyParser.json());
    var pjson = require('./package.json');
    for (dependency in pjson.dependencies) {
        loadEndpoint(dependency);
    }
}

// Load endpoint module which are local node modules found in the modules folder with the prefix 'esn-endpoints-'.
function loadEndpoint(dependency) {
    if (dependency.indexOf('esn-endpoints-') === 0) {
        var endpoints = require(dependency);
        if (typeof endpoints.load == 'function') {
            console.log("Loaded module " + dependency);
            endpoints.load(notificationListener);
        } else {
            console.log("Failed to register module: " + dependency + " as it is missing required function load(api)");
        }
    }
}

module.exports = {
    // Start REST API which contains an endpoint for retrieving notifications.
    listen: function(port) {
        var server = notificationListener.listen(port);
        console.log("Listening for notifications on http://localhost:%s", port);

        // If port is changed in settings.html page reload server
        ipcMain.on('port-changed', function(event) {
            server.close();
            notificationListener.listen(global.settings.port);
            console.log("Listening for notifications on http://localhost:%s", global.settings.port);
        });
        loadAllModuleEndpoints();
    }
}
