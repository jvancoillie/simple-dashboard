const $ = jQuery = require('jquery');

require('bootstrap');
const moment = require('moment');
require('moment/locale/fr');
moment.locale('fr');

import WeatherWidget from './weather';

$(document).ready(function() {
    const test = new WeatherWidget('weather-card',{location: 'Poitiers, FR', units: 'metric', displayName: 'Poitiers', lang:'fr', appid:"9c5213ce52fe7ffa15a904fc80a5f879"});

    const animation = ['fadeInLeft','rollIn','rotateInUpRight','slideInUp','fadeInRight'];

    $('.widget').each(function(i){
        setTimeout(function(){
            $('.widget').eq(i).addClass('is-visible animated '+animation[i]);
        }, 10 * i);
    });


// Clock Widget's Rotation
    $(function() {

        setInterval( function() {
            var seconds = new Date().getSeconds();
            seconds = (seconds === 59 ? 0 : seconds + 1);
            var sdegree = seconds * 6 - 180;
            var srotate = "rotate(" + sdegree + "deg)";

            $("#sec").css({ "transform": srotate });

        }, 1000 );

        setInterval( function() {
            var hours = new Date().getHours();
            var mins = new Date().getMinutes();
            mins = (mins === 59 ? 0 : mins + 1);
            var hdegree = hours * 30 + (mins / 2) - 180;
            var hrotate = "rotate(" + hdegree + "deg)";

            $("#hour").css({ "transform": hrotate});

        }, 1000 );

        setInterval( function() {
            var mins = new Date().getMinutes();
            var mdegree = mins * 6  -180;
            var mrotate = "rotate(" + mdegree + "deg)";

            $("#min").css({ "transform" : mrotate });

        }, 1000 );

        setTimeout(function(){
            $('.clock').addClass('is-visible animated slideInDown');
        }, 1000);
    });
});
