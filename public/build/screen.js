"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen"],{

/***/ "./assets/js/WeatherApp.js":
/*!*********************************!*\
  !*** ./assets/js/WeatherApp.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class WeatherApp {
  constructor(location, units, appid, forecastDays, lang) {
    this.location = location;
    this.units = units;
    this.appid = appid;
    this.forecastDays = forecastDays;
    this.lang = lang;
    this.icon_mapping = {
      '01d': 'wi-day-sunny',
      '01n': 'wi-day-sunny',
      '02d': 'wi-day-cloudy',
      '02n': 'wi-day-cloudy',
      '03d': 'wi-cloud',
      '03n': 'wi-cloud',
      '04d': 'wi-cloudy',
      '04n': 'wi-cloudy',
      '09d': 'wi-rain',
      '09n': 'wi-rain',
      '10d': 'wi-day-rain',
      '10n': 'wi-day-rain',
      '11d': 'wi-thunderstorm',
      '11n': 'wi-thunderstorm',
      '13d': 'wi-snow',
      '13n': 'wi-snow',
      '50d': 'wi-fog',
      '50n': 'wi-fog'
    };
  }
  fetchWeatherData() {
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=${this.units}&appid=${this.appid}&lang=${this.lang}`;

    // Effectuez la requête pour les données météo actuelles et mettez à jour l'affichage
    fetch(currentWeatherApiUrl).then(response => response.json()).then(data => {
      // Mettez à jour la carte avec les données météo actuelles
      this.updateWeatherCard(data);
    }).catch(error => console.error('Erreur lors de la récupération des données météo actuelles', error));
  }
  fetchForecastData() {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.location}&units=${this.units}&appid=${this.appid}&cnt=${this.forecastDays + 1}&lang=${this.lang}`;

    // Effectuez la requête pour les prévisions des trois prochains jours
    fetch(forecastApiUrl).then(response => response.json()).then(data => {
      // Mettez à jour la carte avec les prévisions des trois prochains jours
      this.updateForecast(data);
    }).catch(error => console.error('Erreur lors de la récupération des prévisions météo', error));
  }
  updateWeatherCard(weather) {
    // Mettez à jour la carte avec les données météo actuelles
    const weatherIcon = document.querySelector('.weather-icon img');
    //const cityElement = document.querySelector('.city');
    const temperatureElement = document.querySelector('.temperature');
    const conditionsElement = document.querySelector('.conditions');
    document.getElementsByClassName('ow-city-name')[0].innerHTML = weather.name;
    document.getElementsByClassName('ow-temp-current')[0].innerHTML = Math.round(weather.main.temp) + '&deg';
    document.getElementsByClassName('ow-pressure')[0].innerHTML = weather.main.pressure + ' hPa';
    document.getElementsByClassName('ow-humidity')[0].innerHTML = weather.main.humidity + '%';
    document.getElementsByClassName('ow-wind')[0].innerHTML = weather.wind.speed + ' km/h';
    document.getElementsByClassName('ow-ico-current')[0].classList.add(this.icon_mapping[weather.weather[0].icon]);

    // cityElement.textContent = data.name;
    // temperatureElement.textContent = data.main.temp.toFixed(1);
    // conditionsElement.textContent = data.weather[0].description;
    // weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // Appelez fetchForecastData pour obtenir les prévisions
    this.fetchForecastData();
  }
  updateForecast(data) {
    // Mettez à jour la carte avec les prévisions des trois prochains jours
    const forecastList = document.querySelector('.ow-forecast');

    // Effacez d'abord les anciennes prévisions s'il y en a
    forecastList.innerHTML = '';

    // Affichez les prévisions pour les trois prochains jours
    for (let i = 1; i <= this.forecastDays; i++) {
      const forecast = data.list[i];
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('ow-forecast-item');
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString('fr-FR', {
        weekday: 'long'
      });
      const temp = forecast.temp.day.toFixed(0);
      const min = forecast.temp.min.toFixed(0);
      const max = forecast.temp.max.toFixed(0);
      const conditions = forecast.weather[0].description;
      const icon = this.icon_mapping[forecast.weather[0].icon];
      forecastItem.innerHTML = `
        <div class="ow-day">${day}</div>
        <div class="wi ow-ico ow-ico-forecast ${icon}"></div>
        <div class="ow-forecast-temp">
            <span class="max">${min}&deg</span>
            <span class="min">${max}&deg</span>
        </div>
      `;
      forecastList.appendChild(forecastItem);
    }
  }
  getIconWithHighestOccurence(a) {
    let elems = Array.prototype.slice.call(a);
    return elems.sort((a, b) => elems.filter(v => v === a).length - elems.filter(v => v === b).length).pop();
  }
}
/* harmony default export */ __webpack_exports__["default"] = (WeatherApp);

/***/ }),

/***/ "./assets/js/screen.js":
/*!*****************************!*\
  !*** ./assets/js/screen.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WeatherApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeatherApp */ "./assets/js/WeatherApp.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.mjs");
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/modules */ "./node_modules/swiper/modules/index.mjs");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/css */ "./node_modules/swiper/swiper.css");
/* harmony import */ var swiper_css_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper/css/navigation */ "./node_modules/swiper/modules/navigation.css");
/* harmony import */ var swiper_css_pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper/css/pagination */ "./node_modules/swiper/modules/pagination.css");

// core version + navigation, pagination modules:


// import Swiper and modules styles



var swiper = new swiper__WEBPACK_IMPORTED_MODULE_1__["default"](".mySwiper", {
  modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_2__.Pagination, swiper_modules__WEBPACK_IMPORTED_MODULE_2__.Autoplay],
  spaceBetween: 30,
  // direction: "vertical",
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});

// animation des tuiles au chargement
const animation = ['zoomIn', 'backInRight', 'slideInUp', 'fadeInRight'];
const tiles = document.querySelectorAll('.tile');
const delay = 1000;
tiles.forEach(function (tile, i) {
  setTimeout(function () {
    tile.style.display = 'flex'; // Rend la tuile visible
    tile.classList.add('is-visible', 'animate__animated', 'animate__' + animation[i]);
  }, delay * i);
});

// Fonction pour mettre à jour l'heure en temps réel
function updateTime() {
  const currentTimeElement = document.getElementById('currentTime');
  const now = new Date();
  currentTimeElement.textContent = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Mettre à jour l'heure toutes les secondes
updateTime(); // Mettre à jour immédiatement
setInterval(updateTime, 1000); // Mettre à jour toutes les secondes

const weatherApp = new _WeatherApp__WEBPACK_IMPORTED_MODULE_0__["default"]('Poitiers', 'metric', '9c5213ce52fe7ffa15a904fc80a5f879', 3, 'fr');
weatherApp.fetchWeatherData();

/***/ }),

/***/ "./assets/screen.js":
/*!**************************!*\
  !*** ./assets/screen.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_screen_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/screen.scss */ "./assets/styles/screen.scss");
/* harmony import */ var _js_screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/screen */ "./assets/js/screen.js");



/***/ }),

/***/ "./assets/styles/screen.scss":
/*!***********************************!*\
  !*** ./assets/styles/screen.scss ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-node_modules_swiper_modules_navigation_css-node_modules_swiper_modules_pagination_css-218efe"], function() { return __webpack_exec__("./assets/screen.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NjcmVlbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL3NjcmVlbi5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFdlYXRoZXJBcHAge1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbiwgdW5pdHMsIGFwcGlkLCBmb3JlY2FzdERheXMsIGxhbmcpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy51bml0cyA9IHVuaXRzO1xuICAgIHRoaXMuYXBwaWQgPSBhcHBpZDtcbiAgICB0aGlzLmZvcmVjYXN0RGF5cyA9IGZvcmVjYXN0RGF5cztcbiAgICB0aGlzLmxhbmcgPSBsYW5nO1xuICAgIHRoaXMuaWNvbl9tYXBwaW5nID0ge1xuICAgICAgJzAxZCc6ICd3aS1kYXktc3VubnknLFxuICAgICAgICAnMDFuJzogJ3dpLWRheS1zdW5ueScsXG4gICAgICAgICcwMmQnOiAnd2ktZGF5LWNsb3VkeScsXG4gICAgICAgICcwMm4nOiAnd2ktZGF5LWNsb3VkeScsXG4gICAgICAgICcwM2QnOiAnd2ktY2xvdWQnLFxuICAgICAgICAnMDNuJzogJ3dpLWNsb3VkJyxcbiAgICAgICAgJzA0ZCc6ICd3aS1jbG91ZHknLFxuICAgICAgICAnMDRuJzogJ3dpLWNsb3VkeScsXG4gICAgICAgICcwOWQnOiAnd2ktcmFpbicsXG4gICAgICAgICcwOW4nOiAnd2ktcmFpbicsXG4gICAgICAgICcxMGQnOiAnd2ktZGF5LXJhaW4nLFxuICAgICAgICAnMTBuJzogJ3dpLWRheS1yYWluJyxcbiAgICAgICAgJzExZCc6ICd3aS10aHVuZGVyc3Rvcm0nLFxuICAgICAgICAnMTFuJzogJ3dpLXRodW5kZXJzdG9ybScsXG4gICAgICAgICcxM2QnOiAnd2ktc25vdycsXG4gICAgICAgICcxM24nOiAnd2ktc25vdycsXG4gICAgICAgICc1MGQnOiAnd2ktZm9nJyxcbiAgICAgICAgJzUwbic6ICd3aS1mb2cnXG4gICAgfVxuICB9XG5cbiAgZmV0Y2hXZWF0aGVyRGF0YSgpIHtcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckFwaVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7dGhpcy5sb2NhdGlvbn0mdW5pdHM9JHt0aGlzLnVuaXRzfSZhcHBpZD0ke3RoaXMuYXBwaWR9Jmxhbmc9JHt0aGlzLmxhbmd9YDtcblxuICAgIC8vIEVmZmVjdHVleiBsYSByZXF1w6p0ZSBwb3VyIGxlcyBkb25uw6llcyBtw6l0w6lvIGFjdHVlbGxlcyBldCBtZXR0ZXogw6Agam91ciBsJ2FmZmljaGFnZVxuICAgIGZldGNoKGN1cnJlbnRXZWF0aGVyQXBpVXJsKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyBNZXR0ZXogw6Agam91ciBsYSBjYXJ0ZSBhdmVjIGxlcyBkb25uw6llcyBtw6l0w6lvIGFjdHVlbGxlc1xuICAgICAgICB0aGlzLnVwZGF0ZVdlYXRoZXJDYXJkKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBkb25uw6llcyBtw6l0w6lvIGFjdHVlbGxlcycsIGVycm9yKSk7XG4gIH1cblxuICBmZXRjaEZvcmVjYXN0RGF0YSgpIHtcbiAgICBjb25zdCBmb3JlY2FzdEFwaVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3QvZGFpbHk/cT0ke3RoaXMubG9jYXRpb259JnVuaXRzPSR7dGhpcy51bml0c30mYXBwaWQ9JHt0aGlzLmFwcGlkfSZjbnQ9JHt0aGlzLmZvcmVjYXN0RGF5cyArIDF9Jmxhbmc9JHt0aGlzLmxhbmd9YDtcblxuICAgIC8vIEVmZmVjdHVleiBsYSByZXF1w6p0ZSBwb3VyIGxlcyBwcsOpdmlzaW9ucyBkZXMgdHJvaXMgcHJvY2hhaW5zIGpvdXJzXG4gICAgZmV0Y2goZm9yZWNhc3RBcGlVcmwpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vIE1ldHRleiDDoCBqb3VyIGxhIGNhcnRlIGF2ZWMgbGVzIHByw6l2aXNpb25zIGRlcyB0cm9pcyBwcm9jaGFpbnMgam91cnNcbiAgICAgICAgdGhpcy51cGRhdGVGb3JlY2FzdChkYXRhKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgcHLDqXZpc2lvbnMgbcOpdMOpbycsIGVycm9yKSk7XG4gIH1cblxuICB1cGRhdGVXZWF0aGVyQ2FyZCh3ZWF0aGVyKSB7XG4gICAgLy8gTWV0dGV6IMOgIGpvdXIgbGEgY2FydGUgYXZlYyBsZXMgZG9ubsOpZXMgbcOpdMOpbyBhY3R1ZWxsZXNcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24gaW1nJyk7XG4gICAgLy9jb25zdCBjaXR5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5Jyk7XG4gICAgY29uc3QgdGVtcGVyYXR1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlJyk7XG4gICAgY29uc3QgY29uZGl0aW9uc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9ucycpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3ctY2l0eS1uYW1lJylbMF0uaW5uZXJIVE1MID0gd2VhdGhlci5uYW1lO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ293LXRlbXAtY3VycmVudCcpWzBdLmlubmVySFRNTCA9IE1hdGgucm91bmQod2VhdGhlci5tYWluLnRlbXApICsgJyZkZWcnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ293LXByZXNzdXJlJylbMF0uaW5uZXJIVE1MID0gd2VhdGhlci5tYWluLnByZXNzdXJlICsgJyBoUGEnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ293LWh1bWlkaXR5JylbMF0uaW5uZXJIVE1MID0gd2VhdGhlci5tYWluLmh1bWlkaXR5ICsgJyUnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ293LXdpbmQnKVswXS5pbm5lckhUTUwgPSB3ZWF0aGVyLndpbmQuc3BlZWQgKyAnIGttL2gnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ293LWljby1jdXJyZW50JylbMF0uY2xhc3NMaXN0LmFkZCggdGhpcy5pY29uX21hcHBpbmdbd2VhdGhlci53ZWF0aGVyWzBdLmljb25dKVxuXG4gICAgLy8gY2l0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgLy8gdGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5tYWluLnRlbXAudG9GaXhlZCgxKTtcbiAgICAvLyBjb25kaXRpb25zRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAvLyB3ZWF0aGVySWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHtkYXRhLndlYXRoZXJbMF0uaWNvbn0ucG5nYDtcblxuICAgIC8vIEFwcGVsZXogZmV0Y2hGb3JlY2FzdERhdGEgcG91ciBvYnRlbmlyIGxlcyBwcsOpdmlzaW9uc1xuICAgIHRoaXMuZmV0Y2hGb3JlY2FzdERhdGEoKTtcbiAgfVxuXG4gIHVwZGF0ZUZvcmVjYXN0KGRhdGEpIHtcbiAgICAvLyBNZXR0ZXogw6Agam91ciBsYSBjYXJ0ZSBhdmVjIGxlcyBwcsOpdmlzaW9ucyBkZXMgdHJvaXMgcHJvY2hhaW5zIGpvdXJzXG4gICAgY29uc3QgZm9yZWNhc3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm93LWZvcmVjYXN0Jyk7XG5cbiAgICAvLyBFZmZhY2V6IGQnYWJvcmQgbGVzIGFuY2llbm5lcyBwcsOpdmlzaW9ucyBzJ2lsIHkgZW4gYVxuICAgIGZvcmVjYXN0TGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIC8vIEFmZmljaGV6IGxlcyBwcsOpdmlzaW9ucyBwb3VyIGxlcyB0cm9pcyBwcm9jaGFpbnMgam91cnNcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLmZvcmVjYXN0RGF5czsgaSsrKSB7XG4gICAgICBjb25zdCBmb3JlY2FzdCA9IGRhdGEubGlzdFtpXTtcbiAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZm9yZWNhc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ293LWZvcmVjYXN0LWl0ZW0nKTtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShmb3JlY2FzdC5kdCAqIDEwMDApO1xuICAgICAgY29uc3QgZGF5ID0gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2ZyLUZSJywgeyB3ZWVrZGF5OiAnbG9uZycgfSk7XG4gICAgICBjb25zdCB0ZW1wID0gZm9yZWNhc3QudGVtcC5kYXkudG9GaXhlZCgwKTtcbiAgICAgIGNvbnN0IG1pbiA9IGZvcmVjYXN0LnRlbXAubWluLnRvRml4ZWQoMCk7XG4gICAgICBjb25zdCBtYXggPSBmb3JlY2FzdC50ZW1wLm1heC50b0ZpeGVkKDApO1xuICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGZvcmVjYXN0LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgICBjb25zdCBpY29uID0gICB0aGlzLmljb25fbWFwcGluZ1tmb3JlY2FzdC53ZWF0aGVyWzBdLmljb25dXG4gICAgICBmb3JlY2FzdEl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwib3ctZGF5XCI+JHtkYXl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3aSBvdy1pY28gb3ctaWNvLWZvcmVjYXN0ICR7aWNvbn1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm93LWZvcmVjYXN0LXRlbXBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF4XCI+JHttaW59JmRlZzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWluXCI+JHttYXh9JmRlZzwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBmb3JlY2FzdExpc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uV2l0aEhpZ2hlc3RPY2N1cmVuY2UoYSkge1xuICAgIGxldCBlbGVtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEpO1xuICAgIHJldHVybiBlbGVtcy5zb3J0KChhLCBiKSA9PlxuICAgICAgZWxlbXMuZmlsdGVyKHYgPT4gdiA9PT0gYSkubGVuZ3RoIC0gZWxlbXMuZmlsdGVyKHYgPT4gdiA9PT0gYikubGVuZ3RoXG4gICAgKS5wb3AoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYXRoZXJBcHA7XG4iLCJpbXBvcnQgV2VhdGhlckFwcCBmcm9tIFwiLi9XZWF0aGVyQXBwXCI7XG4vLyBjb3JlIHZlcnNpb24gKyBuYXZpZ2F0aW9uLCBwYWdpbmF0aW9uIG1vZHVsZXM6XG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcic7XG5pbXBvcnQgeyBQYWdpbmF0aW9uLCBBdXRvcGxheSB9IGZyb20gJ3N3aXBlci9tb2R1bGVzJztcbi8vIGltcG9ydCBTd2lwZXIgYW5kIG1vZHVsZXMgc3R5bGVzXG5pbXBvcnQgJ3N3aXBlci9jc3MnO1xuaW1wb3J0ICdzd2lwZXIvY3NzL25hdmlnYXRpb24nO1xuaW1wb3J0ICdzd2lwZXIvY3NzL3BhZ2luYXRpb24nO1xuXG52YXIgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5teVN3aXBlclwiLCB7XG4gIG1vZHVsZXM6IFtQYWdpbmF0aW9uLCBBdXRvcGxheV0sXG4gIHNwYWNlQmV0d2VlbjogMzAsXG4gIC8vIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICBsb29wOiB0cnVlLFxuICBhdXRvcGxheToge1xuICAgIGRlbGF5OiAxMDAwMCxcbiAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXG4gIH0sXG4gIHBhZ2luYXRpb246IHtcbiAgICBlbDogXCIuc3dpcGVyLXBhZ2luYXRpb25cIixcbiAgICBjbGlja2FibGU6IHRydWUsXG4gIH0sXG59KTtcblxuXG4vLyBhbmltYXRpb24gZGVzIHR1aWxlcyBhdSBjaGFyZ2VtZW50XG5jb25zdCBhbmltYXRpb24gPSBbICd6b29tSW4nLCAnYmFja0luUmlnaHQnLCAnc2xpZGVJblVwJywgJ2ZhZGVJblJpZ2h0J107XG5cbmNvbnN0IHRpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRpbGUnKTtcbmNvbnN0IGRlbGF5ID0gMTAwMDtcbnRpbGVzLmZvckVhY2goZnVuY3Rpb24odGlsZSwgaSkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHRpbGUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JzsgLy8gUmVuZCBsYSB0dWlsZSB2aXNpYmxlXG4gICAgdGlsZS5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJywgJ2FuaW1hdGVfX2FuaW1hdGVkJywgJ2FuaW1hdGVfXycgKyBhbmltYXRpb25baV0pO1xuICB9LCBkZWxheSAqIGkpO1xufSk7XG5cblxuXG4vLyBGb25jdGlvbiBwb3VyIG1ldHRyZSDDoCBqb3VyIGwnaGV1cmUgZW4gdGVtcHMgcsOpZWxcbmZ1bmN0aW9uIHVwZGF0ZVRpbWUoKSB7XG4gIGNvbnN0IGN1cnJlbnRUaW1lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50VGltZScpO1xuXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgY3VycmVudFRpbWVFbGVtZW50LnRleHRDb250ZW50ID0gbm93LnRvTG9jYWxlVGltZVN0cmluZygnZnItRlInLCB7XG4gICAgaG91cjogJzItZGlnaXQnLFxuICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIHNlY29uZDogJzItZGlnaXQnXG4gIH0pO1xufVxuXG4vLyBNZXR0cmUgw6Agam91ciBsJ2hldXJlIHRvdXRlcyBsZXMgc2Vjb25kZXNcbnVwZGF0ZVRpbWUoKTsgLy8gTWV0dHJlIMOgIGpvdXIgaW1tw6lkaWF0ZW1lbnRcbnNldEludGVydmFsKHVwZGF0ZVRpbWUsIDEwMDApOyAvLyBNZXR0cmUgw6Agam91ciB0b3V0ZXMgbGVzIHNlY29uZGVzXG5cblxuY29uc3Qgd2VhdGhlckFwcCA9IG5ldyBXZWF0aGVyQXBwKCdQb2l0aWVycycsICdtZXRyaWMnLCAnOWM1MjEzY2U1MmZlN2ZmYTE1YTkwNGZjODBhNWY4NzknLCAzLCAnZnInKTtcbndlYXRoZXJBcHAuZmV0Y2hXZWF0aGVyRGF0YSgpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9zY3JlZW4uc2Nzcyc7XG5pbXBvcnQgJy4vanMvc2NyZWVuJztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJXZWF0aGVyQXBwIiwiY29uc3RydWN0b3IiLCJsb2NhdGlvbiIsInVuaXRzIiwiYXBwaWQiLCJmb3JlY2FzdERheXMiLCJsYW5nIiwiaWNvbl9tYXBwaW5nIiwiZmV0Y2hXZWF0aGVyRGF0YSIsImN1cnJlbnRXZWF0aGVyQXBpVXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsInVwZGF0ZVdlYXRoZXJDYXJkIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJmZXRjaEZvcmVjYXN0RGF0YSIsImZvcmVjYXN0QXBpVXJsIiwidXBkYXRlRm9yZWNhc3QiLCJ3ZWF0aGVyIiwid2VhdGhlckljb24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZW1wZXJhdHVyZUVsZW1lbnQiLCJjb25kaXRpb25zRWxlbWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbm5lckhUTUwiLCJuYW1lIiwiTWF0aCIsInJvdW5kIiwibWFpbiIsInRlbXAiLCJwcmVzc3VyZSIsImh1bWlkaXR5Iiwid2luZCIsInNwZWVkIiwiY2xhc3NMaXN0IiwiYWRkIiwiaWNvbiIsImZvcmVjYXN0TGlzdCIsImkiLCJmb3JlY2FzdCIsImxpc3QiLCJmb3JlY2FzdEl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiZGF0ZSIsIkRhdGUiLCJkdCIsImRheSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJ0b0ZpeGVkIiwibWluIiwibWF4IiwiY29uZGl0aW9ucyIsImRlc2NyaXB0aW9uIiwiYXBwZW5kQ2hpbGQiLCJnZXRJY29uV2l0aEhpZ2hlc3RPY2N1cmVuY2UiLCJhIiwiZWxlbXMiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInNvcnQiLCJiIiwiZmlsdGVyIiwidiIsImxlbmd0aCIsInBvcCIsIlN3aXBlciIsIlBhZ2luYXRpb24iLCJBdXRvcGxheSIsInN3aXBlciIsIm1vZHVsZXMiLCJzcGFjZUJldHdlZW4iLCJsb29wIiwiYXV0b3BsYXkiLCJkZWxheSIsImRpc2FibGVPbkludGVyYWN0aW9uIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwiYW5pbWF0aW9uIiwidGlsZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInRpbGUiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJkaXNwbGF5IiwidXBkYXRlVGltZSIsImN1cnJlbnRUaW1lRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm93IiwidGV4dENvbnRlbnQiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwic2V0SW50ZXJ2YWwiLCJ3ZWF0aGVyQXBwIl0sInNvdXJjZVJvb3QiOiIifQ==