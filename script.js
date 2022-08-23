let cityDisplay = document.getElementById("city");
let tempDisplay = document.getElementById("temp");
let iconDisplay = document.getElementById("icon");
let descriptionDisplay = document.getElementById("description");
let humidityDisplay = document.getElementById("humidity");
let windDisplay = document.getElementById("wind");
let directionDisplay = document.getElementById("direction");
let timeDisplay = document.getElementById("time-display");

let searchBtn = document.getElementById("search-button");
let searchBar = document.getElementById("search-bar");

let weather = {
  apiKey: "02b24d9af50e41dae9451f6367e80574",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name, timezone } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed, deg } = data.wind;
    console.log(
      name,
      temp + "°C",
      humidity + "%",
      description,
      "icon:" + icon,
      speed + "km/h",
      deg + "°",
      timezone
    );
    cityDisplay.innerHTML = "weather in " + name;
    tempDisplay.innerHTML = temp + "°C";
    iconDisplay.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descriptionDisplay.innerHTML = description;
    humidityDisplay.innerHTML = "humidity: " + humidity + "%";
    windDisplay.innerHTML = "wind: " + speed + " km/h";
    directionDisplay.style.transform = "rotate(" + (deg - 45) + "deg) ";
    document.querySelector(".weather").classList.remove("loading");
    let imageUrl = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    document.body.style.backgroundImage = imageUrl;
    displayDate(timezone);
  },
};

searchBtn.onclick = function () {
  let city = searchBar.value;
  weather.fetchWeather(city);
};
addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    searchBtn.click();
  }
});
weather.fetchWeather("london");

function displayDate(timezone) {
  let minutes = new Date().getUTCMinutes();
  let hours = new Date().getUTCHours() + parseInt(timezone / 3600);
  hours = hours % 24;
  let meridiem = hours < 12 ? "AM" : "PM";
  hours = hours < 13 ? hours : (hours % 13) + 1;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  timeDisplay.innerHTML = hours + ":" + minutes + " " + meridiem;
}
