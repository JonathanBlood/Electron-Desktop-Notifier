var path = require('path');
var icon = path.join(__dirname, 'github.png');
var baseUrl = '/notification/github/webhook';
module.exports = {
    load: function(api, notifier) {

        //
        // Webhook: COMMIT_COMMENT
        //
        api.post(baseUrl + '/commit/comment', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Comment ${capitalize(body.action)}`,
                        'message': `By ${body.comment.user.login} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.comment.url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: DEPLOYMENT
        //
        api.post(baseUrl + '/deployment', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Deployment to ${capitalize(body.deployment.environment)}`,
                        'message': `${capitalize(body.deployment.task)} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.deployment.statuses_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: DEPLOYMENT_STATUS
        //
        api.post(baseUrl + '/deployment/status', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${body.deployment_status.state.toUpperCase()}: Deployment to ${capitalize(body.deployment.environment)}`,
                        'message': `For task ${capitalize(body.deployment.task)} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.deployment.statuses_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: FORK
        //
        api.post(baseUrl + '/fork', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${body.repository.full_name} forked by ${capitalize(body.forkee.owner.login)}`,
                        'message': `Forked to ${body.forkee.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.forkee.url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: GOLLUM
        //
        api.post(baseUrl + '/gollum', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Wiki Updated`,
                        'message': `By ${body.sender.login} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.repository.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR : ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: ISSUE_COMMENT
        //
        api.post(baseUrl + '/issue/comment', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Issue comment ${capitalize(body.action)}`,
                        'message': `By ${body.issue.user.login} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.issue.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: ISSUE_STATUS
        //
        api.post(baseUrl + '/issue/status', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Issue #${body.issue.number} ${capitalize(body.action)}`,
                        'message': `${body.issue.title}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.issue.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: LABEL
        //
        api.post(baseUrl + '/label', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Label ${capitalize(body.action)}`,
                        'message': `In ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.repository.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: MEMBER
        //
        api.post(baseUrl + '/member', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Member ${body.member.login} ${body.action}`,
                        'message': `In ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.repository.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: MEMBERSHIP
        //
        api.post(baseUrl + '/membership', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                  var option = (body.action === "added") ? "to" : "from";
                    notifier.notify({
                        'title': `Team  ${body.team.name} updated`,
                        'message': `${capitalize(body.member.login)} ${body.action} ${option} the team ${body.team.name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: MILESTONE
        //
        api.post(baseUrl + '/milestone', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Milestone (#${body.milestone.number}) ${capitalize(body.action)}`,
                        'message': `${body.milestone.title}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.milestone.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: CREATE
        //
        api.post(baseUrl + '/create', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${capitalize(body.ref_type)} created in ${body.repository.full_name}`,
                        'message': `${capitalize(body.ref_type)}: ${body.ref} created by ${body.sender.login}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: DELETE
        //
        api.post(baseUrl + '/delete', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${capitalize(body.ref_type)} deleted in ${body.repository.full_name}`,
                        'message': `${capitalize(body.ref_type)}: ${body.ref} deleted by ${body.sender.login}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: PULL_REQUEST
        //
        api.post(baseUrl + '/pullrequest', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${body.action.toUpperCase()}: Pull request #${body.number}`,
                        'message': `${body.pull_request.title}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.pull_request.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: PULL_REQUEST_REVIEW
        //
        api.post(baseUrl + '/pullrequest/review', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Pull request (#${body.pull_request.number}) review ${body.action}`,
                        'message': `By ${body.review.user.login} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.review_comments_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: PULL_REQUEST_REVIEW_COMMENT
        //
        api.post(baseUrl + '/pullrequest/review/comment', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Pull request (#${body.pull_request.number}) review comment ${body.action}`,
                        'message': `By ${body.comment.user.login} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.comment.url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: PUSH
        //
        api.post(baseUrl + '/push', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Change pushed to repository: ${body.repository.full_name}`,
                        'message': `Pushed to ${body.ref} by ${body.pusher.name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: PAGE_BUILD
        //
        api.post(baseUrl + '/page/build', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `GitHub Pages site ${body.build.status}`,
                        'message': `By ${body.build.pusher.login} in ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: PUBLIC
        //
        api.post(baseUrl + '/public', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${body.repository.full_name} is now open sourced`,
                        'message': `By ${body.sender.login}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.repository.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: RELEASE
        //
        api.post(baseUrl + '/release', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `${capitalize(body.action)} release ${body.release.tag_name}`,
                        'message': `${body.release.name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.release.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: REPOSITORY
        //
        api.post(baseUrl + '/repository', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Repository ${body.repository.full_name} ${capitalize(body.action)}`,
                        'message': `By ${body.sender.login}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.repository.html_url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: TEAM
        //
        api.post(baseUrl + '/team', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `Team ${body.team.name} ${capitalize(body.action)}`,
                        'message': `In ${body.organization.login}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.organization.url
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
                } catch (err) {
                    console.log(`ERROR: ${err.message}`);
                    res.status(500);
                    res.json({
                        message: "Unknown error occurred."
                    });
                }
            }
        });

        //
        // Webhook: WATCH
        //
        api.post(baseUrl + '/watch', function(req, res) {
            var body = req.body;
            if (!body) {
                res.status(400);
                res.json({
                    message: "Failed to send notification."
                });
            } else {
                try {
                    notifier.notify({
                        'title': `User starred ${body.repository.full_name}`,
                        'message': `User starred ${body.repository.full_name}`,
                        'icon': icon,
                        'wait': true,
                        'sound': true,
                        'open': body.repository.html_site
                    });
                    res.status(200);
                    res.json({
                        message: "Notification send."
                    });
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


function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
