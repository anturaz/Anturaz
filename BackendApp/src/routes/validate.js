module.exports = function(app) {

    app.get('/repeatedPayment', async(req, res) => {
        var https = require('https');
        var querystring = require('querystring');
        
        function request(callback) {
            var path=`/v1/registrations/${req.query.registration_id}/payments`;
            var data = querystring.stringify( {
                'entityId':'8ac7a4c967c23b7c0167c493e26804d6',
                'amount':Math.round(req.query.amount).toFixed(2),
                'currency':'PHP',
                'paymentType':'PA',
                'recurringType':'REPEATED'
            });
            var options = {
                port: 443,
                host: 'test.oppwa.com',
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length,
                    'Authorization':'Bearer OGFjN2E0Yzk2N2MyM2I3YzAxNjdjNDkzNWNmMzA0ZDF8VERtYnhjWThOZg=='
                }
            };
            var postRequest = https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    jsonRes = JSON.parse(chunk);
                    return callback(jsonRes);
                });
            });
            postRequest.write(data);
            postRequest.end();
        }
            
        request(function(responseData) {
            res.send(responseData);
        });
    });
    app.get('/paymentResult', async(req, res) => {

        var https = require('https');
        var querystring = require('querystring');
        // console.log(req.query.id)
        function request(callback) {
            var path = '/v1/checkouts/' + req.query.id + '/payment';
            path += '?entityId=8ac7a4c967c23b7c0167c493e26804d6';
            var options = {
                port: 443,
                host: 'test.oppwa.com',
                path: path,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer OGFjN2E0Yzk2N2MyM2I3YzAxNjdjNDkzNWNmMzA0ZDF8VERtYnhjWThOZg=='
                }
            };
            var postRequest = https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    jsonRes = JSON.parse(chunk);
                    return callback(jsonRes);
                });
            });
            postRequest.end();
        }

        request(function(responseData) {
            res.send(responseData);
        });
    });
    app.get('/createCheckOut', async(req, res) => {
        var https = require('https');
        var querystring = require('querystring');

        function request(callback) {
            var path = '/v1/checkouts';
            var data = querystring.stringify({
                'entityId': '8ac7a4c967c23b7c0167c493e26804d6',
                'amount': Math.round(req.query.amount).toFixed(2),
                'currency': 'PHP',
                'paymentType': 'DB'
            });
            var options = {
                port: 443,
                host: 'test.oppwa.com',
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length,
                    'Authorization': 'Bearer OGFjN2E0Yzk2N2MyM2I3YzAxNjdjNDkzNWNmMzA0ZDF8VERtYnhjWThOZg=='
                }
            };
            var postRequest = https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    jsonRes = JSON.parse(chunk);
                    return callback(jsonRes);
                });
            });
            postRequest.write(data);
            postRequest.end();
        }

        request(function(responseData) {
            res.send(responseData);
        });
    });
    app.post('/createCheckOutShopper', async(req, res) => {
        console.log(req.body)
        var https = require('https');
        var querystring = require('querystring');
        var config = {}


        var payment = req.body.payment
            // console.log(payment)
        if (payment.payment_type == "Full Payment") {
            config = {
                'entityId': '8ac7a4c967c23b7c0167c493e26804d6',
                'amount': Math.round(payment.total).toFixed(2),
                'currency': 'PHP',
                'paymentType': 'DB'
            }
        } else if (payment.payment_type == "20% Downpayment" || payment.payment_type == "Layaway") {
            config = {
                'entityId': '8ac7a4c967c23b7c0167c493e26804d6',
                'amount': Math.round(payment.recurring_payments[0].amount).toFixed(2),
                'currency': 'PHP',
                'paymentType': 'DB',
                'recurringType': 'INITIAL',
                'createRegistration':'true',
            }
        }

        function request(callback) {
            console.log(config)
            var data = querystring.stringify(config);
            var path = '/v1/checkouts';
            var options = {
                port: 443,
                host: 'test.oppwa.com',
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length,
                    'Authorization': 'Bearer OGFjN2E0Yzk2N2MyM2I3YzAxNjdjNDkzNWNmMzA0ZDF8VERtYnhjWThOZg=='
                }
            };
            var postRequest = https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    jsonRes = JSON.parse(chunk);
                    return callback(jsonRes);
                });
            });
            postRequest.write(data);
            postRequest.end();
        }

        request(function(responseData) {
            res.send(responseData);
        });

    });

}