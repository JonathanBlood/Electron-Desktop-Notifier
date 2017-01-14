# REST endpoint for GIT WebHooks

Information on Github Webhooks: https://developer.github.com/v3/activity/events/types/

The plugin currently supports the following webhooks:

| Events                      | endpoint                                                |
| ----------------------------|:--------------------------------------------------------|
| Push                        | notification/github/webhook/push                        |
| Create                      | notification/github/webhook/create                      |
| Delete                      | notification/github/webhook/delete                      |
| Pull Request                | notification/github/webhook/pullrequest                 |
| Pull Request Review         | notification/github/webhook/pullrequest/review          |
| Pull Request Review Comment | notification/github/webhook/pullrequest/review/comment  |
| Commit Comment              | notification/github/webhook/commit/comment              |
| Deployment                  | notification/github/webhook/deployment                  |
| Deployment Status           | notification/github/webhook/deployment/status           |
| Fork                        | notification/github/webhook/fork                        |
| Gollum                      | notification/github/webhook/gollum                      |
| Issue Comment               | notification/github/webhook/issue/comment               |
| Issue Status                | notification/github/webhook/issue/status                |
| Label                       | notification/github/webhook/label                       |
| Member                      | notification/github/webhook/member                      |
| Membership                  | notification/github/webhook/membership                  |
| Milestone                   | notification/github/webhook/milestone                   |
| Issue Comment               | notification/github/webhook/issue/comment               |
| Pages                       | notification/github/webhook/page/build                  |
| Public                      | notification/github/webhook/public                      |
| Release                     | notification/github/webhook/release                     |
| Repository                  | notification/github/webhook/repository                  |
| Team                        | notification/github/webhook/team                        |
| Watch                       | notification/github/webhook/watch                       |

*Note:* In order for GitHub to be able to talk to the notification server. You may need to configure port forwarding in your network settings. The port of the notification server can be seen by right clicking the tray icon and selecting *Settings*.

CURL example:
```bash
curl -H "Content-Type: application/json" -X POST -d '<Insert Github JSON payload for push here (https://developer.github.com/v3/activity/events/types/#pushevent)>' http://localhost:38866/notification/github/webhook/push
```
