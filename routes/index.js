var express = require('express');
var router = express.Router();
const {
  locationInfo,
  getInfo
} = require("../public/js/API_integration.js");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Homepage'
  });
});


router.post('/', async function (req, res, next) {
  let city = req.body.location;
  let info = await getInfo(city);
  res.render('weather-card', {
    info: info,
  });

});

module.exports = router;