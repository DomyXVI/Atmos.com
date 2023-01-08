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
    });
});

router.post('/', async function (req, res, next) {
    var { email, password } = req.body;

    try {

        var user = {
            email: email,
            password: crypto.encrypt(password),
        };

        let dbUser = await dbUtils.findUser(user);

        if (dbUser && crypto.decrypt(dbUser.password) == password) {
            console.log("login successful");
            req.session.user = user;

            res.redirect('login?login_successful');
        } else {
            console.log("login failed");
            res.redirect('login?login_failed');
        }

    } catch (e) {
        console.error(e);
        res.redirect("/login?login_error");
    };
});


module.exports = router;