const appId = "0da2f458d4701766e5dc42ce3d7f15be";

/**
 * It fetches the weather data of a city and logs it to the console
 * @param city - The name of the city you want to get the weather data of.
 */
const getWeatherDataOf = async (city) => {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId + "&units=metric";
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    }
};


module.exports = {
    getWeatherDataOf
}