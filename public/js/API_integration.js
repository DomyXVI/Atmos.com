require('dotenv').config()
const {
    cache
} = require("./cache.js");

const appId = process.env.API_KEY;
let data = {};
let locationInfo;

/**
 * It fetches the weather data of a city and logs it to the console
 * @param city - The name of the city you want to get the weather data of.
 */

const getInfo = async (city) => {
    const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + appId;
    const geoCodingInfo = await fetch(geocodingUrl);

    if (geoCodingInfo.ok) {
        locationInfo = await geoCodingInfo.json();
        data["location"] = locationInfo;
        return getWeatherData(locationInfo[0].lat, locationInfo[0].lon);
    }
}

const getWeatherData = async (lat, lon) => {
    if (cache.has(locationInfo[0].name)) {
        console.log("\x1b[32mCACHE HIT\x1b[0m -> " + locationInfo[0].name + ", " + locationInfo[0].country);
        data["weather"] = cache.getKey(locationInfo[0].name).weather;
        return data;
    } else {
        console.log("\x1b[31mCACHE MISS\x1b[0m -> " + locationInfo[0].name + ", " + locationInfo[0].country);
        const weatherDataUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appId + "&units=metric";
        console.log("\u001b[1;33m" + weatherDataUrl);
        const weatherInfo = await fetch(weatherDataUrl);
        if (weatherInfo.ok) {
            data["weather"] = await weatherInfo.json();
            cache.saveKey(locationInfo[0].name, data);
            return data;
        }
    }
    return null;
}

module.exports = {
    getInfo
}