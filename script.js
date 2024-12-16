const apiKey = '6572fbd15c185aa01ffa6d2147c90170';

const form = document.querySelector('.search');
const searchInput = document.getElementById('searchInput');
const icon = document.getElementById('icon');
const sunElement = document.querySelector('.sun');
const clouds = document.querySelectorAll('.cloud1, .cloud2, .cloud3, .cloud4, .cloud5');
const tempElement = document.querySelector('.temp_value');
const humidityElement = document.querySelector('.humidity_value');
const windSpeedElement = document.querySelector('.wind_value');

form.addEventListener('submit', (e) => {
    e.preventDefault();
if (searchInput.value) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&APPID=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      tempElement.innerText = Math.round(data.main.temp);
      humidityElement.innerText = data.main.humidity;
      windSpeedElement.innerText = Math.round(data.wind.speed);

      if (data.weather.length) {
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.style.display = 'block';

        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconCode = data.weather[0].icon;

        if (iconCode.includes('n')) {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');
          clouds.forEach(cloud => {
            cloud.style.display = 'none'
          });
          sunElement.style.display = 'block';
          sunElement.style.backgroundColor = '#3c3e43';

        } else if (weatherCondition === 'rain') {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');

        } else if (weatherCondition === 'clouds') {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');
          clouds.forEach(cloud => {
            cloud.style.display = 'block'
          });
          sunElement.style.display = 'none';

        } else {
          document.body.classList.add('light-theme');
          document.body.classList.remove('dark-theme');
          clouds.forEach(cloud => {
            cloud.style.display = 'block'
          });
          sunElement.style.backgroundColor = '#EB6E4B';
          sunElement.style.display = 'block';
        }

        
      } else {
        icon.src = '';
        icon.style.display = 'none';
      }
    })
    .catch(() => {
      tempElement.innerText = '-';
      humidityElement.innerText = '-';
      windSpeedElement.innerText = '-';
    });
}
else {
    alert('Veuillez entrer une ville');
    return;
}
    
  });