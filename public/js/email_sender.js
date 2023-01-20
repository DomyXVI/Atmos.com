require('dotenv').config()
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'domenico.marabello16@gmail.com',
        pass: 'xazzwsqoxhaaymso'
    }
});

const mailer = {
    sendActivationMailTo: async function (email, token) {

        let htmlVersion = await ejs.renderFile(path.join(__dirname, '../../views/email.ejs'), { token: token })

        await transporter.sendMail({
            from: 'domenico.marabello16@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Your Atmos.com Activation Code", // Subject line
            html: htmlVersion
        });
    },

    sendRecoveryMailTo: async function (email, token) {
        await transporter.sendMail({
            from: 'domenico.marabello16@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Your Atmos.com Recovery Token", // Subject line
            text: "Here is your recovery token: " + "http://localhost:5000/password-reset/" + token
        });
    }
}

module.exports = {
    mailer
}