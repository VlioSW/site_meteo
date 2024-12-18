const apiKey = '6572fbd15c185aa01ffa6d2147c90170';

const form = document.querySelector('.search');
const searchInput = document.getElementById('searchInput');
const cityElement = document.querySelector('.city');
const icon = document.getElementById('icon');
const sunElement = document.querySelector('.sun');
const clouds = document.querySelectorAll('.cloud');
const tempElement = document.querySelector('.temp_value');
const humidityElement = document.querySelector('.humidity_value');
const windSpeedElement = document.querySelector('.wind_value');

const showClouds = (show, icon) => {
  clouds.forEach(cloud => {
    cloud.style.display = show ? 'block' : 'none';
    if (icon) {
      cloud.src = icon;
    }
  });
}

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
      cityElement.innerText = data.name;
      tempElement.innerText = Math.round(data.main.temp);
      humidityElement.innerText = data.main.humidity;
      windSpeedElement.innerText = Math.round(data.wind.speed);

      if (data.weather.length) {
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.style.display = 'block';

        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconCode = data.weather[0].icon;

        sunElement.style.display = 'block';

        const isNightTime = iconCode.includes('n');
        if (isNightTime) {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');
          sunElement.style.backgroundColor = '#3c3e43';
        } else {
          document.body.classList.add('light-theme');
          document.body.classList.remove('dark-theme');
          sunElement.style.backgroundColor = '#EB6E4B';
        }
        
        if (weatherCondition === 'rain' || weatherCondition === 'drizzle') {
          showClouds(true, 'https://openweathermap.org/img/wn/09d@4x.png');
        }
        
        if (weatherCondition === 'clouds') {
          showClouds(true);
        }

        if (weatherCondition === 'clear') {
          showClouds(false);
        }

        
      } else {
        icon.src = '';
        icon.style.display = 'none';
      }
    })
    .catch(() => {
      cityElement.innerText = '--';
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