const moment = require("moment");

(function (w) {
  function showTemperature(response) {
    w.document.querySelector(".city").innerHTML = response.data.name;
    w.document.querySelector(".temperature").innerHTML =
      Math.round(response.data.main.temp) + "&#176;";
    w.document.querySelector(".day").innerHTML = moment().format("YYYY-MM-DD");
    w.document.querySelectorAll(".next-days").forEach(function (img) {
      img.style.display = "flex";
    });
    w.document.querySelectorAll(".emoji-emoji-sizer").forEach(function (img) {
      img.style.display = "inline";
    });
    w.document.querySelectorAll(".box").forEach(function (img) {
      img.style.display = "block";
    });
    w.document.querySelectorAll(".box2").forEach(function (img) {
      img.style.display = "none";
    });
  }
  function search() {
    const value = w.document.querySelector(".search").value;
    const apiKey = "8ada9ef551812d3cb48084db2588ce66";
    let city = value; //"Sydney";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  }

  w.document.querySelector(".search-btn").addEventListener("click", search);

  function currentLocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
      const apiKey = "8ada9ef551812d3cb48084db2588ce66";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric`;
      axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
    });
  }
  w.document
    .querySelector(".current-btn")
    .addEventListener("click", currentLocation);
})(window);
