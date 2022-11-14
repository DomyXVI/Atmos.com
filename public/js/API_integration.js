require('dotenv').config()


const appId = process.env.API_KEY;

/**
 * It fetches the weather data of a city and logs it to the console
 * @param city - The name of the city you want to get the weather data of.
 */
const getWeatherDataOf = async (city) => {

    let data = {};

    const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + appId;

    const geoCodingInfo = await fetch(geocodingUrl);

    if (geoCodingInfo.ok) {
        data["location"] = await geoCodingInfo.json();
    }

    const weatherDataUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + data.location[0].lat + "&lon=" + data.location[0].lon + "&appid=" + appId + "&units=metric";

    const weatherInfo = await fetch(weatherDataUrl);

    if (weatherInfo.ok) {
        data["weather_info"] = await weatherInfo.json();
        console.log(data);
        return data;
    }
};

module.exports = {
    getWeatherDataOf
}