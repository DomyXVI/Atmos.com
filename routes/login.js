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
    res.render('login', {
        title: 'Login',
        found: null,
        activated: null
    });
});

router.post('/', async function (req, res, next) {
    var { email, password } = req.body;

    try {

        var user = {
            email: email,
            password: crypto.encrypt(password),
        };

        console.log(user);

        let dbUser = await dbUtils.findUser(user);

        if (credentialsOk(dbUser, password) && dbUser.emailConfirmed) {
            console.log("login successful");
            req.session.user = dbUser;
            console.log(req.session.user);
            res.redirect('/');
        } else if (credentialsOk(dbUser, password) && !dbUser.emailConfirmed && dbUser.tokenExpiration > Date.now()) {
            res.render('login', {
                success: "failed",
                activated: false,
                found: true
            });
        } else {
            console.log("account not found, subscribe again and check your email for the activation code.");
            res.render('login', {
                success: "failed",
                activated: false,
                found: false
            });
        }

    } catch (e) {
        console.error(e);
        res.redirect("/login?login_error");
    };
});

function credentialsOk(dbUser, password) {
    return (dbUser && crypto.decrypt(dbUser.password) == password);
}

module.exports = router;