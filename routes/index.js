var express = require('express');
var router = express.Router();
const {
  getWeatherDataOf
} = require("../public/js/API_integration.js");
const appId = "0da2f458d4701766e5dc42ce3d7f15be";
let city;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Homepage'
  });
});


router.post('/', async function (req, res, next) {
  let city = req.body.location;
  let weatherData = await getWeatherDataOf(city);
  console.log(weatherData);
  res.render('weather-card', {
    weatherData: weatherData
  });

});

module.exports = router;