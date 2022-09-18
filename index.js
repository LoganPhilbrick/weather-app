const APIKEY = "1e92dfdcded69a53ecb95b2e92c583a2";
const temp = document.getElementById("temp");
const dateTime = document.getElementById("dateTime");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const loader = document.getElementById("loaderBg");

let formattedDate;
let weatherInfo;

// format date

const formatDate = () => {
  //create Date
  let today = new Date();
  //extract day
  let dd = today.getDate();
  //extract month
  let mm = today.getMonth() + 1;

  //convert date to proper full month
  switch (mm) {
    case 1:
      mm = "January";
    case 2:
      mm = "february";
    case 3:
      mm = "March";
    case 4:
      mm = "April";
    case 5:
      mm = "May";
    case 6:
      mm = "June";
    case 7:
      mm = "July";
    case 8:
      mm = "August";
    case 9:
      mm = "September";
    case 10:
      mm = "October";
    case 11:
      mm = "November";
    case 12:
      mm = "December";
  }

  // set string of month and day
  return (formattedDate = `${mm} ${dd}`);
};

//convert kelvin to fahrenheit
const convertKToF = (kelvin) => {
  return (kelvin - 273.15) * 1.8 + 32;
};

// Function getting user's location info and fetching from the weather api

const fetchWeatherData = (APIKEY, lat, long) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`
  )
    .then((res) => res.json())
    .then((data) => (weatherInfo = data))
    .then(() => {
      let convertedTemp = convertKToF(weatherInfo.main.temp);
      temp.innerText = `${parseInt(convertedTemp)}°`;
      dateTime.innerHTML = `${formattedDate} in ${weatherInfo.name}`;
      humidity.innerHTML = `${weatherInfo.main.humidity}%`;
      wind.innerHTML = `${parseInt(weatherInfo.wind.speed)} mph`;
      pressure.innerHTML = `${weatherInfo.main.pressure} mb`;
      loader.style.display = "none";
    });
};

const getCoordsAndFetchData = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) =>
    fetchWeatherData(APIKEY, coords.latitude, coords.longitude)
  );
};

getCoordsAndFetchData();
formatDate();
