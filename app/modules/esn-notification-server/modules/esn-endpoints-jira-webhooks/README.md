# REST endpoint for JIRA WebHooks

Information on Jira Webhooks: https://developer.atlassian.com/jiradev/jira-apis/webhooks

The endpoint for the Jira webhooks is: *notification/jira/webhook/push*

The Jira webhooks supported are:
| Type                       | Event                        |
| ---------------------------|------------------------------|
| Issue                      | Created                      |
| Issue                      | Updated                      |
| Issue                      | Deleted                      |


*Note:* In order for Jira to be able to talk to the notification server. You may need to configure port forwarding in your network settings. The port of the notification server can be seen by right clicking the tray icon and selecting *Settings*.

CURL example:
```bash
curl -H "Content-Type: application/json" -X POST -d '<Insert Jira JSON payload for push here (https://developer.github.com/v3/activity/events/types/#pushevent)>' http://localhost:38866/notification/jira/webhook/push
```
