function formatDate(data) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[data.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[data.getMonth()];
  let date = data.getDate();
  let hour = data.getHours();
  let minutes = data.getMinutes();

  return `${day}, ${date} ${month}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];

}

function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
forecast.forEach(function (forecastDay, index) {
if (index < 6) {
  forecastHTML = forecastHTML + `
<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
        alt=""
        width="25"
      />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-min-temp">${Math.round(forecastDay.temperature.minimum)}°</span>
      <span class="weather-forecast-max-temp">${Math.round(forecastDay.temperature.maximum)}°</span>
      </div>
  </div>
`;}});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

let currentdate = document.querySelector("#today");
let data = new Date();


currentdate.innerHTML = formatDate(data);

function getForecast(coordinates) {
console.log(coordinates);
let apiKey = `e4fc849f9b230t53ac4fc6ffacf0bo9b`
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&unit=metric`
axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature-today").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#weather-description").innerHTML = response.data.condition.description;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let weatherIcon = document.querySelector('#weather-icon');
  weatherIcon.setAttribute("src",response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "e4fc849f9b230t53ac4fc6ffacf0bo9b";
  let city = document.querySelector("#insert-city").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

}



function myPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e4fc849f9b230t53ac4fc6ffacf0bo9b";
  let units = "metric";
  let apiEndpoint = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}

//function displayFahrenheitTemperature(event) {
 //event.preventDefault();
 //let temperatureElement = document.querySelector("#temperature-today");
 //let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
 //temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
//}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

let localButton = document.querySelector("#button");
localButton.addEventListener("click", getCurrentPosition);

displayForecast();



//function displayFahrenheitTemperature(event) {
 //event.preventDefault();
 //let temperatureElement = document.querySelector("#temperature-today");
 //let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
 //temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//let celciusTemperature = null;

//handleSubmit("Amsterdam");


