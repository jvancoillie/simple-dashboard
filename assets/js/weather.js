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
            const apiRequest = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.location}&units=${this.units}&appid=${this.appid}&cnt=${this.forecastDays}&lang=${this.lang}`;

            this.getWeather(apiRequest, this.displayName);
        }
    }

    getWeather(apiRequest, cityName) {
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
        if (conditionCode === 520 || conditionCode === 521 ||conditionCode === 522 ){
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

    renderData(data, city) {
        const cityName = city;
        const country = data.city.country;
        const temp = data.list[0].temp.day.toFixed(0);
        const tempF = (temp * 9 / 5 + 32).toFixed(0);
        const tempMin = data.list[0].temp.min.toFixed(0);
        const tempMax = data.list[0].temp.max.toFixed(0);
        const shortDesc = data.list[0].weather[0].description;
        const day = moment().format('dddd D MMMM');

        // Build HTML elements and insert data
        let html = `<div class="cityContainer cityCard${this.instanceID}">
            <div class="weatherDate">${cityName}</div>
            
            
            <div class="d-flex justify-content-around my-2">
       
                <div class="weatherIcon">
                ${this.getWeatherIcon(data.list[0].weather[0].id)}
                </div>
                <div class="tempAndCity d-flex flex-column align-items-center">
                    <p class="weatherDesc">${shortDesc}</p>
                    <p class="weatherTemp">${temp}°C</p>
                </div>
               
            </div>
             <div class="d-flex justify-content-between">
                </div>
            
        </div>`;

        // Append the html to the page with the data
        $('.ww-wrapper .'+this.targetEl).append(html);

        // Call method to change the WeatherCard background by passing it's condition code
        this.changeCardBg(data.list[0].weather[0].id);

        // Convert the temperature units on click.
        const $thisTemp = $('.'+this.targetEl+' .weatherTemp');

        $thisTemp.off('click').on('click', (e) => {
            if ($thisTemp.text().indexOf('C') > -1) {
                $thisTemp.text(tempF + '°F');
            } else {
                $thisTemp.text(temp + '°C');
            }
        });

    }



    // Set Background colours with classes varying on the condition.
    changeCardBg(conditionCode) {

        const category = Number(String(conditionCode).charAt(0));
        const $thisCityCard = $('.cityCard'+this.instanceID);

        if (conditionCode === 800) {
            $thisCityCard.addClass('sunny-class');
        } else if (category === 2) {
            $thisCityCard.addClass('stormy-class');
        } else if (category === 3 || category === 5) {
            $thisCityCard.addClass('rainy-class');
        } else if (category === 6) {
            $thisCityCard.addClass('snow-class');
        } else if (category === 7 || category === 8) {
            $thisCityCard.addClass('cloudy-class');
        }

    }

}
