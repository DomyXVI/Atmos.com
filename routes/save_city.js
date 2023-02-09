var express = require('express');
var router = express.Router();
const {
    dbUtils
} = require("../public/js/database.js");

const {
    getInfo
} = require("../public/js/API_integration.js");



/* GET home page. */
router.post('/', async function (req, res, next) {
    let user = req.session.user;
    if (user && await getInfo(req.body.city)) {
        await dbUtils.saveCity(user.email, req.body.city);
        req.session.user = await dbUtils.findQuery("email", user.email);
        res.status(200);
        res.end();
    } else if (user && !await getInfo(req.body.city)) {
        console.log("Something went wrong!");
        res.status(200);
        res.end();
    }
});

module.exports = router;
