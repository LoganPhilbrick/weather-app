const APIKEY = "1e92dfdcded69a53ecb95b2e92c583a2"
const locationHeader = document.getElementById('location');
let weatherInfo;
// Function getting user's location info and fetching from the weather api

const fetchWeatherData = (APIKEY, lat, long) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => weatherInfo = data)
        .then(() => locationHeader.innerHTML = weatherInfo.name)
}

const getCoordsAndFetchData = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => fetchWeatherData(APIKEY, coords.latitude, coords.longitude))

}

getCoordsAndFetchData()


const convertKelvin = (kelvin) => {
    return (((kelvin - 273.15) * 1.8) + 32)
}

console.log("hello console")

// feature
