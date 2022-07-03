var express = require('express');
var router = express.Router();
const {
  getWeatherDataOf
} = require("../public/js/API-integration.js");
const appId = "0da2f458d4701766e5dc42ce3d7f15be";
let city;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Homepage'
  });
});


router.post('/', async function (req, res, next) {
  city = req.body.location;
  getWeatherDataOf(city);
  res.render('index', {
    title: 'Homepage'
  });

});

module.exports = router;