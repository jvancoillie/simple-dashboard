export default class WeatherWidget {
    constructor(targetEl, options) {

        this.forecastDays = 4;
        this.targetEl = targetEl;
        this.instanceID = targetEl.slice(-1);

        if (!options) {
            return;
        } else {
            this.appid = options.appid;
            this.location = options.location;
            this.units = options.units;
            this.displayName = options.displayName;
            this.lang = options.lang;

            this.getWeather();
            setInterval(this.getWeather.bind(this), 60*60*1000);

        }
    }

    getWeather() {
        const apiRequest = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.location}&units=${this.units}&appid=${this.appid}&cnt=${this.forecastDays}&lang=${this.lang}`;
        const cityName = this.displayName;
        $.getJSON(apiRequest, (data) => {
            this.renderData(data, cityName);
        })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(`Error: ${errorThrown}`);
                console.log(`TextStatus: ${textStatus}`);
            });
    }

    getWeatherIcon(conditionCode) {

        let category = Number(String(conditionCode).charAt(0));
        const conditionDescriptions = {
            2: ['wi-storm-showers', '#5C6D75'],
            3: ['wi-rain-mix', '#51d2fc'],
            5: ['wi-rain', '#2cc4f5'],
            6: ['wi-snow', '#B2EBF2'],
            7: ['wi-fog', '#90A4AE'],
            800: ['wi-day-sunny', '#ffc000'],
            8: ['wi-day-cloudy', '#a3bcc7'],
            9: ['wi-cloudy-gusts', '#A2B4BA']
        };

        // add inline styles for icon elements to ensure the correct icon colour is placed through loops
        if (conditionCode === 520 || conditionCode === 521 || conditionCode === 522) {
            let iconHTML = `<i class="wi wi-showers" style="color: '${conditionDescriptions[category][1]}"></i>`;
            return iconHTML;
        } else if (conditionCode === 800) {
            let iconString = conditionDescriptions[800][0];
            let iconHTML = `<i class="wi ${iconString}" style="color: ${conditionDescriptions[800][1]}"></i>`;
            return iconHTML;
        } else {
            let iconString = conditionDescriptions[category][0];
            let iconHTML = `<i class="wi ${iconString}" style="color: ${conditionDescriptions[category][1]}"></i>`;
            return iconHTML;
        }

    }

    // Returns next 3 days for forecast.
    returnNextDays(n) {
        // const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayNames = moment.weekdays();

        const today = (new Date()).getDay();
        let nextDays = [];
        for (let i = 0; i < n; i++) {
            nextDays.push(dayNames[(today + 1 + i) % dayNames.length]);
        }
        return nextDays;
    }

    renderData(data, city) {
        const cityName = city;
        const country = data.city.country;
        const temp = data.list[0].temp.day.toFixed(0);
        const shortDesc = data.list[0].weather[0].description;
        let card = this.getWeatherCard(data.list[0].weather[0].id);

        // Append the html to the page with the data
        $('.' + this.targetEl).html(card);

        $('.' + this.targetEl).find('.weather').html(shortDesc);
        $('.' + this.targetEl).find('.temp').html(temp);
        $('.' + this.targetEl).find('.city').html(cityName);

        $('.' + this.targetEl).find('.cloud').each(function (e) {
            var duration = Math.floor((Math.random() * 20000) + 10000) * (e / 10);

            setTimeout(function () {
                $('.cloud').eq(e).addClass('animated');
            }, duration);
        });

        $('.' + this.targetEl).find('.rain_drop').each(function (e) {
            var duration = Math.floor((Math.random() * 3000) + 300) * (e / 10);

            setTimeout(function () {
                $('.rain_drop').eq(e).addClass('animated');
            }, duration);
        });

        // Grab the next 3 days and loop through each with the days top temperature.
        // generate forecast sections and loop through the data for each day
        const nextDays = this.returnNextDays(3);
        let forecast = nextDays.map((nextDay, i) => {
            return `<div class="forecastCard d-flex justify-content-around flex-column"><p>${nextDay}</p>
                  <p class="forecastIcons">${this.getWeatherIcon(data.list[i + 1].weather[0].id)}</p>
                  <p class="forecastMax">${data.list[i + 1].temp.max.toFixed(0)}°</p>
                  <p class="forecastMin">${data.list[i + 1].temp.min.toFixed(0)}°</p></div>`
        }).join('');

        $('.' + this.targetEl + ' .weatherForecast').append(forecast);

    }

    getWeatherCard(conditionCode) {
        let card = null;
        const category = Number(String(conditionCode).charAt(0));
        if (conditionCode === 800) {
            card = `<div class="card sunny">
                    <div class="top">
                        <div class="weather"></div>
                        <div class="temp"></div>
                        <div class="city"></div>
                        <div class="sun">
                            <div class="rays"></div>
                            <div class="rays two"></div>
                        </div>
                    </div>
                    <div class="weatherForecast d-flex justify-content-between"></div>
                </div>`;
        } else if (category === 2) {
            card = `<div class="card storm">
                    <div class="top">
                        <div class="rain_wrap">
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                        </div>
                        <div class="weather"></div>
                        <div class="temp"></div>
                        <div class="city"></div>
                    </div>
                    <div class="weatherForecast d-flex justify-content-between"></div>
                </div>`;
        } else if (category === 3 || category === 5) {
            card = `<div class="card cloudy">
                    <div class="top">
                        <div class="rain_wrap">
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                           <div class="rain_drop"></div>
                        </div>
                        <div class="cloud" style="top: -65px;transform: scale(1.1);"></div>
                        <div class="cloud" style="top: 0;transform: scale(0.7);"></div>
                        <div class="cloud" style="top: 100px;transform: scale(1.3);"></div>
                        <div class="cloud" style="top: 40px;"></div>

                        <div class="weather"></div>
                        <div class="temp"></div>
                        <div class="city"></div>
                    </div>
                    <div class="weatherForecast d-flex justify-content-between"></div>
                </div>`;
        } else if (category === 6) {
            card = `<div class="card snow">
                    <div class="top">
                        <div class="cloud" style="top: -65px;transform: scale(1.1);"></div>
                        <div class="cloud" style="top: 0;transform: scale(0.7);"></div>
                        <div class="cloud" style="top: 100px;transform: scale(1.3);"></div>
                        <div class="cloud" style="top: 40px;"></div>
                         <div class="snow_wrap">
                         </div>
                        <div class="weather"></div>
                        <div class="temp"></div>
                        <div class="city"></div>
                    </div>
                    <div class="weatherForecast d-flex justify-content-between"></div>
                </div>`;

        } else if (category === 7 || category === 8) {
            card = `<div class="card cloudy">
                    <div class="top">
                        <div class="cloud" style="top: -65px;transform: scale(1.1);"></div>
                        <div class="cloud" style="top: 0;transform: scale(0.7);"></div>
                        <div class="cloud" style="top: 100px;transform: scale(1.3);"></div>
                        <div class="cloud" style="top: 40px;"></div>
                        <div class="weather"></div>
                        <div class="temp"></div>
                        <div class="city"></div>
                    </div>
                    <div class="weatherForecast d-flex justify-content-between"></div>
                </div>`;
        }

        return card;
    }

}


