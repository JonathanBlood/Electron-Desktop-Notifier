const path = require('path');
const remote = require('electron').remote;
var window = remote.getCurrentWindow();
document.getElementById("port").value = remote.getGlobal('settings').port;
function doNotify(evt) {
    if (evt.srcElement.id == "save") {
        var port = document.getElementById("port").value;
        remote.getGlobal('settings').port = port;
        var ipcRenderer = require('electron').ipcRenderer;
        ipcRenderer.send('port-changed');
        window.close();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("save").addEventListener("click", doNotify);
})
