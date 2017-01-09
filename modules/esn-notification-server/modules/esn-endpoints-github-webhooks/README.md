# REST endpoint for GIT WebHooks

Currently supports the following webhooks:
* push

*Note:* In order for GitHub to be able to talk to the notification server. You may need to configure port forwarding in your network settings. The port of the notification server can be seen by right clicking the tray icon and selecting *Settings*.

CURL example:
```bash
curl -H "Content-Type: application/json" -X POST -d '<Insert Github JSON payload for push here (https://developer.github.com/v3/activity/events/types/#pushevent)>' http://localhost:38866/notification/github/webhook/push
```
