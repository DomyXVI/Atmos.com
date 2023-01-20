var express = require('express');
var router = express.Router();
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
router.post('/', async function (req, res, next) {
    const { email } = req.body;
    let token = crypto.getToken(12);
    try {
        let user = await dbUtils.findQuery("email", email);
        if (!user) {
            return res.status(400).send({ error: 'Invalid email address' });
        }

        dbUtils.updateUser(user, "passwordResetToken", token);
        dbUtils.updateUser(user, "passwordResetTokenExpiration", Date.now() + 5 * 60 * 1000);

        mailer.sendRecoveryMailTo(email, token);
        res.redirect("/login");

    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});


module.exports = router;
