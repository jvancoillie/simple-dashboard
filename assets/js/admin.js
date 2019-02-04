const $ = jQuery = require('jquery');

require('bootstrap');

const moment = require('moment');
require('moment/locale/fr');
moment.locale('fr');

require('pickadate-webpack/lib/picker');
require('pickadate-webpack/lib/picker.date');
require('pickadate-webpack/lib/picker.time');

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

    $('[data-toggle="popover"]').popover();
    $('.datepicker').pickadate();
    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });

});