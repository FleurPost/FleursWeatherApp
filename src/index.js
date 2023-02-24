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

let currentdate = document.querySelector("#today");
let data = new Date();

currentdate.innerHTML = formatDate(data);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature-today").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  //document.querySelector("#weather-icon").innerHTML = response.condition.icon_url;

}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "e4fc849f9b230t53ac4fc6ffacf0bo9b";
  let city = document.querySelector("#insert-city").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

function myPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e4fc849f9b230t53ac4fc6ffacf0bo9b";
  let units = "metric";
  let apiEndpoint = `https://api.shecodes.io/weather/v1/forecast`;
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}

let localButton = document.querySelector("#button");
localButton.addEventListener("click", getCurrentPosition);