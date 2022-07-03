const appId = "0da2f458d4701766e5dc42ce3d7f15be";



/**
 * It takes a city name as an argument, and returns the weather data of that city
 * @param city - The name of the city you want to get the weather data of.
 */
const getWeatherDataOf = async (city) => {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId + "&units=metric";
    const res = await fetch(url);
    console.log(res.status);
    if (res.ok) {
        const data = await res.json();
        console.log(data);
    }
};


module.exports = {
    getWeatherDataOf
}