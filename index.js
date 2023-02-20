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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-today").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let city = document.querySelector("#insert-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

function myPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let units = "metric";
  let name = "Voorbeeld";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&name=${name}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}

let localButton = document.querySelector("#button");
localButton.addEventListener("click", getCurrentPosition);