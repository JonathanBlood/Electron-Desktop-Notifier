module.exports = {
    load: function(api, notifier) {
        api.post('/notification', function(req, res) {
            if (!req.body.title || typeof req.body.title != "string" || !req.body.message || typeof req.body.message != "string") {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                var path = require('path');
                req.body.icon = path.join(__dirname, 'icon.png');
                req.body.sound = true;
                notifier.notify(req.body);
                res.status(200);
                res.json({
                    message: "Notification send."
                });
            }
        });
    }
};
