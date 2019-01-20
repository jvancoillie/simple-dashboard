const $ = jQuery = require('jquery');
const moment = require('moment');
require('moment/locale/fr');
moment.locale('fr');

// this "modifies" the jquery module: adding behavior to it
// the bootstrap module doesn't export/return anything
require('bootstrap');
require('pickadate-webpack/lib/picker');
require('pickadate-webpack/lib/picker.date');
require('pickadate-webpack/lib/picker.time');
import WeatherWidget from './weather';


$(document).ready(function() {
    jQuery.extend( jQuery.fn.pickadate.defaults, {
        monthsFull: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
        monthsShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
        weekdaysFull: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
        weekdaysShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
        today: 'Aujourd\'hui',
        clear: 'Effacer',
        close: 'Fermer',
        firstDay: 1,
        format: 'dd mmmm yyyy',
        formatSubmit: 'yyyy-mm-dd',
        labelMonthNext:"Mois suivant",
        labelMonthPrev:"Mois précédent",
        labelMonthSelect:"Sélectionner un mois",
        labelYearSelect:"Sélectionner une année"
    });

    jQuery.extend( jQuery.fn.pickatime.defaults, {
        clear: 'Effacer'
    });

    $('[data-toggle="popover"]').popover();
    $('.datepicker').pickadate();
    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });

        // pass in no parameters - uses your current location
        const test = new WeatherWidget('weatherCard1',{location: 'Poitiers, FR', units: 'metric', displayName: 'Poitiers', lang:'fr', appid:"9c5213ce52fe7ffa15a904fc80a5f879"});

    function realtime() {

        let time = moment().format('HH:mm:ss');
        document.getElementById('time').innerHTML = time;

        setInterval(() => {
            time = moment().format('HH:mm:ss');
            document.getElementById('time').innerHTML = time;
        }, 1000)
    }

    realtime();
});
