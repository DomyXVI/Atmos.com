var express = require('express');
var router = express.Router();
const {
    getInfo
} = require("../public/js/API_integration.js");

router.get('/', async function (req, res, next) {
    res.redirect('/');
});

router.post('/', async function (req, res, next) {
    let city = req.body.location;
    let info = await getInfo(city);
    if (info) {
        let hourly_temps = new Array(48);
        let hourly_pop = new Array(48);

        for (let i = 0; i < info.weather.hourly.length; i++) {
            hourly_temps[i] = info.weather.hourly[i].temp;
            hourly_pop[i] = info.weather.hourly[i].pop * 100;
        }

        res.cookie("hourly_temps", hourly_temps, { maxAge: 3600000 });
        res.cookie("hourly_pop", hourly_pop, { maxAge: 3600000 });

        res.cookie("timezone", info.weather.timezone_offset, { maxAge: 3600000 })

        res.render('dashboard', {
            info: info,
        });

    } else if (info == null) {
        res.redirect('/?cityNotFound=true');
    }

});

module.exports = router;