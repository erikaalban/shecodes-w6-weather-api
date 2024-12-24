//Challenge 1
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  let details = `${day} ${time}`;
  return details;
}

function updateCityDetails(event) {
  event.preventDefault();
  let now = new Date();
  let formattedInfo = formatDate(now);
  let dateDetails = document.querySelector(".times");
  dateDetails.innerHTML = formattedInfo;
}

let submitButton = document.querySelector("#search-result");
submitButton.addEventListener("submit", updateCityDetails);

let key = "9b7bac1cbc64o0da36fd874214ect64b";

function addCity() {
  let searchInput = document.querySelector(".search-input");
  let input = searchInput.value;
  let keyValue = input.toLowerCase().trim().replace(/\s+/g, "%20");
  return keyValue;
}

function updateCityApiUrl() {
  let city = addCity();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  return apiUrl;
}

function displayData(event) {
  event.preventDefault();

  let apiUrl = updateCityApiUrl(); // Dynamically generate the API URL
  axios.get(apiUrl).then((response) => {
    updateCity(response);
    updateTemp(response);
    updateCondition(response);
    updateHumidity(response);
    updateWind(response);
    console.log(response);
    // Add additional functions to update other elements as needed
  });
}

function updateCity(response) {
  let city = response.data.city;
  let cityDisplay = document.querySelector(".current-city");
  cityDisplay.innerHTML = city;
}

function updateTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  let tempDisplay = document.querySelector(".current-temperature-value");
  tempDisplay.innerHTML = temperature;
}
/*
function updateTempIcon(response) {
  let tempIcon = response.data.condition.icon_url;
  let iconDisplay = document.querySelector(".current-temperature-icon");
  iconDisplay.innerHTML = tempIcon;
}
*/
function updateCondition(response) {
  let condition = response.data.condition.description;
  let conDisplay = document.querySelector(".condition");
  conDisplay.innerHTML = condition;
}

function updateHumidity(response) {
  let humidity = response.data.temperature.humidity;
  let humDisplay = document.querySelector(".humidity");
  humDisplay.innerHTML = humidity;
}

function updateWind(response) {
  let wind = response.data.wind.speed;
  let windDisplay = document.querySelector(".wind");
  windDisplay.innerHTML = wind;
}

let form = document.querySelector("#search-result");
form.addEventListener("submit", displayData);
