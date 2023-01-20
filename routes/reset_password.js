var express = require('express');
var router = express.Router();
const {
    dbUtils
} = require("../public/js/database.js");
/* GET home page. */

router.get('/:token', async function (req, res, next) {
    let token = req.params.token;
    let dbUser = await dbUtils.findQuery("passwordResetToken", token);
    if (dbUser && dbUser.passwordResetTokenExpiration > Date.now()) {
        res.render('reset_password', { token: token })
    } else {
        res.send("Token invalid or expired");
    }
});

module.exports = router;