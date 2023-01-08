var express = require('express');
var router = express.Router();

const {
    dbUtils
} = require("../public/js/database.js");

const {
    crypto
} = require("../public/js/crypto.js");

dbUtils.connectToDabase();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('signup', {
        title: 'Signup',
    });
});

router.post('/', async function (req, res, next) {
    var { email, password } = req.body;
    try {

        var user = {
            email: email,
            password: crypto.encrypt(password),
            token: crypto.getToken(16),
            emailConfirmed: false,
            tokenExpiration: Date.now() + 1000 * 16 * 10
        }

        if (! await dbUtils.findQuery("email", user.email)) {

            await dbUtils.registerUser(user);
            res.render('signup', {
                signup: 'ok',
            });

        } else {
            res.render('signup', {
                signup: 'failed',
            });
        }
    } catch (e) {
        console.error(e);
        res.redirect("/signup?signup_error");
    };
});


module.exports = router; 