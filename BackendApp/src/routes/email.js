const appLink = "http://enturaz.us-east-1.elasticbeanstalk.com/#/"
    // "http://enturaz.us-east-1.elasticbeanstalk.com/#/" "http://localhost:8080/#/"
const systemUserVerification = require('./email-template/systemUserVerification.js')
const systemUserVerificationConfirmation = require('./email-template/systemUserVerificationConfirmation.js')
const storeCreationConfirmation = require('./email-template/storeCreationConfirmation.js')
const shopperPasswordChangeConfirmation = require('./email-template/shopperPasswordChangeConfirmation.js')
const shopperRegistrationConfirmation = require('./email-template/shopperRegistrationConfirmation.js')
const publishStore = require('./email-template/publishStore.js')
const customizableEmail = require('./email-template/customizableEmail.js')
module.exports = function(app) {

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gilbert230709@gmail.com',
            pass: 'Aeccestane23'
        }
    });
    //SYSTEM USER VERIFICATION
    app.use('/SystemUserVerification?:id', (req, res) => {
        console.log("hello")
        app.service("systemuser").find({
            query: {
                _id: req.query.id
            }
        }).then(result => {
            var mailOptions = {
                from: 'gilbert230709@gmail.com',
                to: result.data[0].email,
                subject: 'System User Account Verification',
                html: systemUserVerification(appLink, result)
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send("ERROR")
                } else {
                    console.log('Email sent: ' + result.data[0].email + " " + info.response);
                    res.send("SUCCESSFUL")
                }
            });
        });
    });

    //SYSTEM USER VERIFICATION CONFIRMATION
    app.use('/ConfirmationSystemUserVerification?:id', (req, res) => {
        console.log("VERCON")
        app.service("systemuser").find({
            query: {
                _id: req.query.id
            }
        }).then(result => {
            var mailOptions = {
                from: 'gilbert230709@gmail.com',
                to: result.data[0].email,
                subject: 'System User Verification Confirmation',
                html: systemUserVerificationConfirmation(appLink, result)
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send("ERROR")
                } else {
                    console.log('Email sent: ' + result.data[0].email + " " + info.response);
                    res.send("SUCCESSFUL")
                }
            });
        });
    });

    //STORE CREATION CONFIRMATION
    app.use('/CreateStoreConfirmation?:id', (req, res) => {
        app.service("shop").find({
            query: {
                _id: req.query.id
            }
        }).then(result => {
            console.log(result)

            var mailOptions = {
                from: 'gilbert230709@gmail.com',
                to: result.data[0].email,
                subject: 'Store Creation Confirmation',
                html: storeCreationConfirmation(appLink, result)
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send("ERROR")
                } else {
                    console.log('Email sent: ' + result.data[0].email + " " + info.response);
                    res.send("SUCCESSFUL")
                }
            });
        });
    });
    //SYSTEM USER VERIFICATION
    app.use('/ShopperPasswordChangeConfirmation?:id', (req, res) => {
        console.log("SHopperChangePW")
        app.service("shopper").find({
            query: {
                _id: req.query.id
            }
        }).then(result => {
            var mailOptions = {
                from: 'gilbert230709@gmail.com',
                to: result.data[0].email,
                subject: 'Confirmation of Change Password',
                html: shopperPasswordChangeConfirmation(appLink, result)
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send("ERROR")
                } else {
                    console.log('Email sent: ' + result.data[0].email + " " + info.response);
                    res.send("SUCCESSFUL")
                }
            });
        });
    });
    //SYSTEM USER VERIFICATION
    app.use('/ShopperRegistrationConfirmation?:id', (req, res) => {

        app.service("users").find({
            query: {
                _id: req.query.id
            }
        }).then(result => {
            var mailOptions = {
                from: 'gilbert230709@gmail.com',
                to: result.data[0].email,
                subject: 'Confirmation of Registration',
                html: shopperRegistrationConfirmation(appLink, result)
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send("ERROR")
                } else {
                    console.log('Email sent: ' + result.data[0].email + " " + info.response);
                    res.send("SUCCESSFUL")
                }
            });
        });
    });

    //STORE PUBLISHING
    app.use('/PublishStore?:id', (req, res) => {

        app.service("shop").find({
            query: {
                _id: req.query.id
            }
        }).then(result => {
            var mailOptions = {
                from: 'gilbert230709@gmail.com',
                to: result.data[0].email,
                subject: 'Store Published',
                html: publishStore(appLink, result)
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.send("ERROR")
                } else {
                    console.log('Email sent: ' + result.data[0].email + " " + info.response);
                    res.send("SUCCESSFUL")
                }
            });
        });
    });
    //CUSTOMIZABLE 
    app.post('/CustomizableEmail', (req, res) => {

        var mailOptions = {
            from: 'gilbert230709@gmail.com',
            to: req.body.receiver,
            subject: req.body.subject,
            html: customizableEmail(req.body.message)
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error)
                res.send("ERROR")
            } else {
                console.log('Email sent: ' + result.data[0].email + " " + info.response);
                res.send("SUCCESSFUL")
            }
        });

    });
};