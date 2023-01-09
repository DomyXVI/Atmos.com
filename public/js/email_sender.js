require('dotenv').config()
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'smiciolinomiao@gmail.com',
        pass: 'ldeimsaaubvmthaf'
    }
});

const mailer = {
    sendActivationMailTo: async function (email, activationToken) {
        await transporter.sendMail({
            from: 'smiciolinomiao@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Your Atmos.com Activation Code", // Subject line
            text: `
            Press this link to activate your atmosweather email!
            http://localhost:5000/activate/confirm?token=${activationToken}
            `
        });
    }
}

module.exports = {
    mailer
}