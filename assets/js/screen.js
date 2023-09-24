import WeatherApp from "./WeatherApp";
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

var swiper = new Swiper(".mySwiper", {
  modules: [Pagination, Autoplay],
  spaceBetween: 30,
  // direction: "vertical",
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// animation des tuiles au chargement
const animation = [ 'zoomIn', 'backInRight', 'slideInUp', 'fadeInRight'];

const tiles = document.querySelectorAll('.tile');
const delay = 1000;
tiles.forEach(function(tile, i) {
  setTimeout(function() {
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


const weatherApp = new WeatherApp('Poitiers', 'metric', '9c5213ce52fe7ffa15a904fc80a5f879', 3, 'fr');
weatherApp.fetchWeatherData();
