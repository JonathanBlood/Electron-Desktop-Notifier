const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var notifier = require('node-notifier');
var notificationListener = express();
var server;
var electronSupport = true;

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
            endpoints.load(notificationListener, notifier);
        } else {
            console.log("Failed to register module: " + dependency + " as it is missing required function load(api)");
        }
    }
}

module.exports = {
    // Start REST API which contains an endpoint for retrieving notifications.
    listen: function(port) {
        server = notificationListener.listen(port);

        // If port is changed in settings.html page reload server
        if (electronSupport) {
            var ipcMain = require('electron').ipcMain;
            ipcMain.on('port-changed', function(event) {
                server.close();
                notificationListener.listen(global.settings.port);
                console.log("Listening for notifications on http://localhost:%s", global.settings.port);
            });
        }
        loadAllModuleEndpoints();
    },
    close: function() {
        if (server) {
            server.close();
        }
    },
    setElectronSupport: function(support) {
        electronSupport = support;
    }
}
