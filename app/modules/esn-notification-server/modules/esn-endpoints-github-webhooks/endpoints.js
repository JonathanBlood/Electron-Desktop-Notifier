module.exports = {
    load: function(api) {
        api.post('/notification/github/webhook/push', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                var notifier = require('node-notifier');
                var path = require('path');
                notifier.notify({
                    'title': 'Change pushed to repository: ' + body.repository.full_name,
                    'message': 'Pushed to ' + body.ref + " by " + body.pusher.name,
                    'icon': path.join(__dirname, 'github.png'),
                    'wait': true,
                    'sound': true
                });
                res.status(200);
                res.json({
                    message: "Notification send."
                });
            }
        });
    }
};
