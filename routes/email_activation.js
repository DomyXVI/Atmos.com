var express = require('express');
var router = express.Router();
const {
    dbUtils
} = require("../public/js/database.js");
/* GET home page. */
router.get('/confirm', async function (req, res) {
    let token = req.query.token;
    let user = await dbUtils.findQuery("token", token);
    if (user && user.emailConfirmed != true && user.tokenExpiration > Date.now()) {
        await dbUtils.updateUser(user, "emailConfirmed", true);
        console.log("email activated");
        res.redirect("/");
    } else {
        console.log("token expired or unexistent");
        res.redirect("/");
    }
});
//http://localhost:5000/activate/confirm?token=b094f7cf0e16eaa1a94ec74424be0a88
module.exports = router;