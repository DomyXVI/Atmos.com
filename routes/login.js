var express = require('express');
var router = express.Router();
require('dotenv').config()
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

        await dbUtils.registerUser(user);
        res.redirect("/login?signup_ok");

        //let foundUser = await dbUtils.findUser(user);
        //if (crypto.decrypt(foundUser.password) == password) { console.log("FOUND") }
    } catch (e) {
        console.error(e);
        res.redirect("/login?signup_error");
    };
});


module.exports = router;