const express = require('express');
const router = express.Router();

const {
    dbUtils
} = require("../public/js/database.js");

const {
    crypto
} = require("../public/js/crypto.js");

const {
    mailer
} = require("../public/js/email_sender.js");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('signup', {
        title: 'Signup',
        success: null
    });
});

router.post('/', async function (req, res, next) {

    var { email, password } = req.body;
    try {

        var user = {
            email: email,
            password: crypto.encrypt(password),
            token: crypto.getToken(16),
            savedCities: [],
            emailConfirmed: false,
            tokenExpiration: Date.now() + 10 * 60 * 1000
        }


        let userPresent = await dbUtils.findQuery("email", user.email);

        if (!userPresent) {

            await dbUtils.registerUser(user);

            mailer.sendActivationMailTo(user.email, user.token);

            setTimeout(async () => {
                await dbUtils.deleteIf("Users", { email: user.email, emailConfirmed: false });
            }, 10 * 60 * 1000);

            res.render('signup', {
                success: "ok",
            });

        } else if (userPresent) {
            res.render('signup', {
                success: "failed",
            });
        } else {
            res.render('signup', {
                success: "error",
            });
        }
    } catch (e) {
        console.error(e);
        res.redirect("/signup?signup_error");
    };
});


module.exports = router; 