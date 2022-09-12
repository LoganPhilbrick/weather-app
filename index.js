const APIKEY = "1e92dfdcded69a53ecb95b2e92c583a2"
const lat = "40.2415"
const long = "-75.2838"

const fetchWeatherData = async (APIKEY, lat, long) => {
const coords = await  navigator.geolocation.getCurrentPosition((position) => console.log(position))
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKEY}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
}

fetchWeatherData(APIKEY, lat, long)