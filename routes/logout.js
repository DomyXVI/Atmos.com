var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    if (req.session.user) {
        req.session.destroy();
        res.redirect("/");
    }
});

module.exports = router;