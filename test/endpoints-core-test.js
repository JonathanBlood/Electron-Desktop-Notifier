var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Endpoints: Core', function() {
    var url = 'http://localhost:9000';
    var server;
    beforeEach(function() {
        server = require('esn-notification-server');
        server.setElectronSupport(false);
        server.listen(9000);
    });
    afterEach(function() {
        server.close();
    });

    it('should fail since title is missing', function(done) {
        var body = {
            message: 'When it all goes wrong!'
        };
        request(url)
            .post('/notification')
            .send(body)
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.property('status', 400);
                done();
            });
    });

    it('should fail since message is missing', function(done) {
        var body = {
            title: 'When it all goes wrong!'
        };
        request(url)
            .post('/notification')
            .send(body)
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.property('status', 400);
                done();
            });
    });

    it('should send a notification', function(done) {
        var body = {
            title: 'Hello world!',
            message: 'Sandwiches'
        };
        request(url)
            .post('/notification')
            .send(body)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property('message');
                res.should.have.property('status', 200);
                done();
            });
    });
});
