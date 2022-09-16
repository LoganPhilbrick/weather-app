const APIKEY = "1e92dfdcded69a53ecb95b2e92c583a2";
const temp = document.getElementById("temp");
const dateTime = document.getElementById("dateTime");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// calculate date

let today = new Date();
let dd = today.getDate();

let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}
today = mm + "-" + dd + "-" + yyyy;

let weatherInfo;
// Function getting user's location info and fetching from the weather api

const fetchWeatherData = (APIKEY, lat, long) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`
  )
    .then((res) => res.json())
    .then((data) => (weatherInfo = data))
    .then(() => {
      let convertedTemp = convertKelvin(weatherInfo.main.temp);
      temp.innerText = `${parseInt(convertedTemp)}°`;
      dateTime.innerHTML = `${today} in ${weatherInfo.name}`;
      humidity.innerHTML = `${weatherInfo.main.humidity}%`;
      wind.innerHTML = `${parseInt(weatherInfo.wind.speed)} mph`;
      pressure.innerHTML = `${weatherInfo.main.pressure} mb`;
    });
};

const getCoordsAndFetchData = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) =>
    fetchWeatherData(APIKEY, coords.latitude, coords.longitude)
  );
};

getCoordsAndFetchData();

const convertKelvin = (kelvin) => {
  return (kelvin - 273.15) * 1.8 + 32;
};
