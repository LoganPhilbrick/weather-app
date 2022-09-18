const APIKEY = "1e92dfdcded69a53ecb95b2e92c583a2";
const temp = document.getElementById("temp");
const dateTime = document.getElementById("dateTime");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const skyIcon = document.getElementById("skyIcon");

const loader = document.getElementById("loaderBg");

let weatherIcon;
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
      break;
    case 2:
      mm = "february";
      break;
    case 3:
      mm = "March";
      break;
    case 4:
      mm = "April";
      break;
    case 5:
      mm = "May";
      break;
    case 6:
      mm = "June";
      break;
    case 7:
      mm = "July";
      break;
    case 8:
      mm = "August";
      break;
    case 9:
      mm = "September";
      break;
    case 10:
      mm = "October";
      break;
    case 11:
      mm = "November";
      break;
    case 12:
      mm = "December";
      break;
  }

  // set string of month and day
  return (formattedDate = `${mm} ${dd}`);
};

// update weather icon

const updateIcon = () => {
  // create variable to hold API sky information
  let i = weatherInfo.weather[0].main;
  // switch to update i variable based on API sky information
  switch (i) {
    case "Clear":
      i = "sunny";
      break;
    case "Rain":
      i = "rainy";
      break;
  }
  // return and update weatherIcon with new i value
  return (weatherIcon = i);
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
      dateTime.innerHTML = `${formattedDate}th in ${weatherInfo.name}`;
      humidity.innerHTML = `${weatherInfo.main.humidity}%`;
      wind.innerHTML = `${parseInt(weatherInfo.wind.speed)} mph`;
      pressure.innerHTML = `${weatherInfo.main.pressure} mb`;
      // call function to update weatherIcon
      updateIcon();
      // update HTML to change icon based on weather
      skyIcon.innerHTML = weatherIcon;
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
