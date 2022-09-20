const APIKEY = "1e92dfdcded69a53ecb95b2e92c583a2";
const temp = document.getElementById("temp");
const dateAndTime = document.getElementById("dateAndTime");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const skyIcon = document.getElementById("skyIcon");
const box = document.querySelector(".outerBox");
const loader = document.querySelector(".loaderContainer");

let formattedDate;
let weatherInfo;
let weatherIcon;

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

//convert kelvin to fahrenheit
const convertKToF = (kelvin) => {
  return (kelvin - 273.15) * 1.8 + 32;
};

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
    case "Clouds":
      i = "cloudy";
  }
  // return and update weatherIcon with new i value
  return (weatherIcon = i);
};

const fetchWeatherData = (APIKEY, lat, long) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`
  )
    .then((res) => res.json())
    .then((data) => (weatherInfo = data))
    .then(() => {
      let convertedTemp = convertKToF(weatherInfo.main.temp);
      temp.innerText = `${parseInt(convertedTemp)}°`;
      dateAndTime.innerHTML = `${formattedDate}th in ${weatherInfo.name}`;
      humidity.innerHTML = `${weatherInfo.main.humidity}%`;
      wind.innerHTML = `${parseInt(weatherInfo.wind.speed)} mph`;
      pressure.innerHTML = `${weatherInfo.main.pressure} mb`;
      // call to update the weather icon
      updateIcon();
      // update innerHTML to display new icon
      skyIcon.innerHTML = weatherIcon;
      // hide loader
      loader.style.display = "none";
      // make content visible once page is ready
      setTimeout(() => {
        box.style.visibility = "visible";
      }, 200);
    });
};

const getCoordsAndFetchData = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) =>
    fetchWeatherData(APIKEY, coords.latitude, coords.longitude)
  );
};

getCoordsAndFetchData();
formatDate();
