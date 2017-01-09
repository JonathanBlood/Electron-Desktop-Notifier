# Core REST endpoint for notification server

Endpoint provides the ability to send a generic desktop notification.

CURL example:
```bash
curl -H "Content-Type: application/json" -X POST -d '{"title" : "Hello world!","message" : "Sandwiches"}' http://localhost:38866/notification
```
