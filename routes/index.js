var express = require('express');
var router = express.Router();
const {
    getInfo
} = require("../public/js/API_integration.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Homepage'
    });
});


router.post('/', async function(req, res, next) {
    let city = req.body.location;
    let info = await getInfo(city);

    let hourly_temps = [...info.weather.hourly];

    for (let i = 0; i < info.weather.hourly.length; i++) {
        hourly_temps[i] = info.weather.hourly[i].temp;
    }

    res.cookie("hourly_temps", hourly_temps, { maxAge: 30000 });

    res.cookie("timezone", info.weather.timezone_offset, { maxAge: 30000 })
    res.render('dashboard', {
        info: info,
    });



});

module.exports = router;