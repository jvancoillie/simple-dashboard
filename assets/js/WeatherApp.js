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
    }
  }

  fetchWeatherData() {
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=${this.units}&appid=${this.appid}&lang=${this.lang}`;

    // Effectuez la requête pour les données météo actuelles et mettez à jour l'affichage
    fetch(currentWeatherApiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Mettez à jour la carte avec les données météo actuelles
        this.updateWeatherCard(data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des données météo actuelles', error));
  }

  fetchForecastData() {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.location}&units=${this.units}&appid=${this.appid}&cnt=${this.forecastDays + 1}&lang=${this.lang}`;

    // Effectuez la requête pour les prévisions des trois prochains jours
    fetch(forecastApiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Mettez à jour la carte avec les prévisions des trois prochains jours
        this.updateForecast(data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des prévisions météo', error));
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
    document.getElementsByClassName('ow-ico-current')[0].classList.add( this.icon_mapping[weather.weather[0].icon])

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
      console.log(forecast)
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString('fr-FR', { weekday: 'long' });
      const temp = forecast.temp.day.toFixed(0);
      const min = forecast.temp.min.toFixed(0);
      const max = forecast.temp.max.toFixed(0);
      const conditions = forecast.weather[0].description;
      const icon =   this.icon_mapping[forecast.weather[0].icon]
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
    return elems.sort((a, b) =>
      elems.filter(v => v === a).length - elems.filter(v => v === b).length
    ).pop();
  }

}

export default WeatherApp;
