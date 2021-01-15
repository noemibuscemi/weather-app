//const moment = require("moment");
const apiKey = "8ada9ef551812d3cb48084db2588ce66";

function toFar(degrees) {
  return (degrees * 9) / 5 + 32;
}

function setShownCss() {
  window.document.querySelectorAll(".next-days").forEach(function (img) {
    img.style.display = "flex";
  });
  window.document
    .querySelectorAll(".emoji-emoji-sizer")
    .forEach(function (img) {
      img.style.display = "inline";
    });
  window.document.querySelectorAll(".box").forEach(function (img) {
    img.style.display = "block";
  });
  window.document.querySelectorAll(".box2").forEach(function (img) {
    img.style.display = "none";
  });
}

function ShowTemperatureOneDay(dom, data) {
  console.log(data);
  console.log(dom);
  let temp = data.temp.day || data.temp;
  dom.querySelector(".degrees").innerHTML =
    Math.round(temp) +
    "&#176;C / " +
    Math.round(toFar(temp)) +
    "&#176;F" +
    "<br>Wind speed: " +
    data.wind_speed +
    "<br>Description: " +
    data.weather[0].description;
  dom
    .querySelector(".emoji")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    );
  let weekdayDom = dom.querySelector(".weekday");
  if (weekdayDom) weekdayDom.innerHTML = moment.unix(data.dt).format("ddd");
}

function showTemperature(response) {
  window.document.querySelector(".day").innerHTML = moment().format(
    "YYYY-MM-DD"
  );
  console.log(response);

  ShowTemperatureOneDay(
    window.document.querySelector(".today"),
    response.data.current
  );

  let days = window.document.querySelectorAll(".next-days .day");
  for (let i = 0; i < days.length; i++) {
    ShowTemperatureOneDay(days[i], response.data.daily[i + 1]);
  }

  setShownCss();
}

function setCity(city) {
  window.document.querySelector(".city").innerHTML = city;
}

function getTemperature(lat, lon) {
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&units=metric`;
  axios
    .get(`${apiUrl}&appid=${apiKey}`)
    .then((res) => {
      let city = res.data[0].name;
      setCity(city);
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric`;
      return axios.get(`${apiUrl}&appid=${apiKey}`);
    })
    .then(showTemperature);
}

function search() {
  const value = window.document.querySelector(".search").value;
  let city = value;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  //axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then((res) => {
    console.log(res);
    getTemperature(res.data[0].lat, res.data[0].lon);
  });
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(function (location) {
    getTemperature(location.coords.latitude, location.coords.longitude);
    //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric`;
    //axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  });
}

function setListeners() {
  window.document
    .querySelector(".search-btn")
    .addEventListener("click", search);
  window.document
    .querySelector(".current-btn")
    .addEventListener("click", currentLocation);
}

setListeners();
