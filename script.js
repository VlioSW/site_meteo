const apiKey = '6572fbd15c185aa01ffa6d2147c90170';

const form = document.querySelector('.search');
const searchInput = document.getElementById('searchSaisi');
const icon = document.getElementById('icone');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windSpeedElement = document.querySelector('.wind_speed');

form.addEventListener('submit', (e) => {
    e.preventDefault();
if (searchInput.value) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&APPID=${apiKey}')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      humidityElement.innerHTML = data.main.humidity;
      windSpeedElement.innerHTML = Math.round(data.wind.speed);
      tempElement.innerHTML = Math.round(data.main.temp);
      if (data.weather.length) {
        icon.src = '';
      } else {
        icon.src = '';
      }
    })
    .catch(() => {
        humidityElement.innerText = '-';
        windSpeedElement.innerText = '-';
        tempElement.innerText = '-';
    });
}
else {
    alert('Veuillez entrer une ville');
    return;
}
    
  });