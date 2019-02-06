const $ = jQuery = require('jquery');

require('bootstrap');
const moment = require('moment');
require('moment/locale/fr');
moment.locale('fr');

import WeatherWidget from './weather';

$(document).ready(function() {
    const test = new WeatherWidget('weather-card',{location: 'Poitiers, FR', units: 'metric', displayName: 'Poitiers', lang:'fr', appid:"9c5213ce52fe7ffa15a904fc80a5f879"});

    function realtime() {
        let time = moment().format('HH:mm:ss');

        setInterval(() => {
            time = moment().format('HH:mm:ss');
            document.getElementById('time').innerHTML = time;
            if(time === '00:00:30'){
                document.location.reload(true)
            }
        }, 1000)
    }

    realtime();
});
