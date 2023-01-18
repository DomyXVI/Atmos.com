var express = require('express');
var router = express.Router();

const {
    dbUtils
} = require("../public/js/database.js");
/* GET home page. */
router.post('/confirm', async function (req, res) {
    let token = req.query.token;
    let user = await dbUtils.findQuery("token", token);
    if (user && user.emailConfirmed != true && user.tokenExpiration > Date.now()) {
        await dbUtils.updateUser(user, "emailConfirmed", true);
        console.log("email activated");
        res.redirect("/login");
    } else {
        console.log("token expired or unexistent");
        res.redirect("/login");
    }
});

module.exports = router;