const appId = "32c0f2091d38267341ab9b3644922e87";

/**
 * It fetches the weather data of a city and logs it to the console
 * @param city - The name of the city you want to get the weather data of.
 */
const getWeatherDataOf = async(city) => {

    /*keeping them here for future usage*/
    //const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + appId;
    //const url2 = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appId;

    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId + "&units=metric";

    console.log(url);
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    }
};


function parseGeocoding() {

}

module.exports = {
    getWeatherDataOf
}