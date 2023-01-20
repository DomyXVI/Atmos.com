var express = require('express');
var router = express.Router();
const {
    dbUtils
} = require("../public/js/database.js");

const {
    crypto
} = require("../public/js/crypto.js");


/* GET home page. */
router.post('/:token', async function (req, res, next) {
    const token = req.params.token;
    const { newPassword } = req.body;
    let dbUser = await dbUtils.findQuery("passwordResetToken", token);
    if (dbUser && dbUser.passwordResetTokenExpiration > Date.now()) {
        await dbUtils.updateUser(dbUser, "password", crypto.encrypt(newPassword));
        await dbUtils.removeExpirationToken(await dbUtils.findQuery("passwordResetToken", token));
        res.redirect("/login");
    } else {
        res.send("Token invalid or expired.");
    }
});


module.exports = router;
