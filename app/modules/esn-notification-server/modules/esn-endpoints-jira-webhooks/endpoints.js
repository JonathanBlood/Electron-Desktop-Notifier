var notifier = require('node-notifier');
var path = require('path');
var icon = path.join(__dirname, 'jira.png');
var url = '/notification/jira/webhook';

// Enum for the different webhook events
var eventsEnum = {
    ISSUE_CREATED: 'jira:issue_created',
    ISSUE_UPDATED: 'jira:issue_updated',
    ISSUE_DELETED: 'jira:issue_deleted'
};

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function parseWebhookResponse(body) {
    var notificationBodyHolder;
    switch (body.webhookEvent) {
        case eventsEnum.ISSUE_CREATED:
            notificationBodyHolder = {
                title: `Issued created: ${body.issue.key}`,
                message: `${body.issue.fields.summary}`
            }
            break;
        case eventsEnum.ISSUE_UPDATED:
            notificationBodyHolder = {
                title: `Issued updated: ${body.issue.key}`,
                message: `${body.issue.fields.summary}`
            }
            break;
        case eventsEnum.ISSUE_DELETED:
            notificationBodyHolder = {
                title: `Issued deleted: ${body.issue.key}`,
                message: `${body.issue.fields.summary}`
            }
            break;
    }
    return notificationBodyHolder;
}

module.exports = {
    load: function(api) {

        api.post(url, function(req, res) {
            var body = req.body;
            if (!body.webhookEvent) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    var bodyHolder = parseWebhookResponse(body);
                    if (!bodyHolder) {
                        res.status(400);
                        res.json({
                            message: "Failed to send notification since no valid JIRA webhook was passed."
                        });
                    } else {
                        notifier.notify({
                            'title': `${bodyHolder.title}`,
                            'message': `${bodyHolder.message}`,
                            'icon': icon,
                            'wait': true,
                            'sound': true
                        });
                        res.status(200);
                        res.json({
                            message: "Notification send."
                        });
                    }
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

    }
};
