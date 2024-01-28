document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const weatherInfo = document.getElementById("weather-info");
  const mapContainer = document.querySelector(".map-container");
  const timeContainer = document.querySelector(".timezone-info")
  let map = null;

  form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const city = this.querySelector("[name='city']").value;
      try {
        const weatherData = await getWeatherData(city);
        const { coord } = weatherData;
        const lat = coord.lat;
        const lon = coord.lon;
        const astronomyData = await getAstronomyData(lat, lon);
        const timezoneData = await getTimezoneData(lat, lon, city);
        renderWeatherInfo(weatherData, astronomyData);
        displayTimezoneInfo(timezoneData);
        renderMap(lat, lon, weatherData.name);
        showMapContainer();
        timeContainer.style.display="block";
    } catch (error) {
        weatherInfo.innerHTML = "<p class='error'><i class='fas fa-exclamation-triangle'></i> Please, enter a valid city name </p>";
        removeMapContainer();
        timeContainer.style.display = "none";
    }
});
async function getTimezoneData(lat, lon, city) {
  const timezoneAPIUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=KZONKTR9PCFM&format=json&by=position&lat=${lat}&lng=${lon}`;
  const response = await fetch(timezoneAPIUrl);
  const data = await response.json();
  return {
      cityName: data.zoneName,
      zoneName: data.zoneName,
      timestamp: data.timestamp
  };
}

function displayTimezoneInfo(timezoneData) {
  const timezoneInfo = document.querySelector(".timezone-info");
  if (timezoneData) {
      const adjustedTimestamp = timezoneData.timestamp - (6 * 60 * 60); 
      const adjustedTime = new Date(adjustedTimestamp * 1000).toLocaleString();
      
      const timezoneHtml = `
          <p><i class="far fa-clock"></i> Current Time: <br>${adjustedTime}</p>
      `;
      timezoneInfo.innerHTML = timezoneHtml;
  } else {
      timezoneInfo.innerHTML = "<p>Unable to fetch timezone information.</p>";
  }
}
  async function getWeatherData(city) {
    const apiKey = "dfe2f0f85af50928919ba51d8b0e4e3d";
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(weatherAPIUrl);
    return response.json();
  }

  async function getAstronomyData(lat, lon) {
    const astronomyApiKey = "fHiCapPrSK";
    const astronomyAPIUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today&api_key=${astronomyApiKey}`;
    const response = await fetch(astronomyAPIUrl);
    const data = await response.json();
    return data.results;
  }
 
 
  function renderWeatherInfo(weatherData, astronomyData) {
      const tempCelsius = Math.round((weatherData.main.temp - 32) * 5 / 9);
      const feelsLikeCelsius = Math.round((weatherData.main.feels_like - 32) * 5 / 9);
      const description = weatherData.weather[0].description;
      const coordinates = `${weatherData.coord.lat}, ${weatherData.coord.lon}`;
      const countryCode = weatherData.sys.country;
      const rainVolume = weatherData.rain && weatherData.rain["3h"] ? `${weatherData.rain["3h"]} mm` : "No rain recorded in the last 3 hours";
      const sunrise = astronomyData ? astronomyData.sunrise : "";
      const sunset = astronomyData ? astronomyData.sunset : "";
      const tempId = tempCelsius > 0 ? "temp" : "temp2";

      const weatherInfoHTML = `
        <div class="card">
          <p id="${tempId}"><i class="fas fa-thermometer-half"></i> ${tempCelsius}&deg;C</p>
          <p id="ftemp">(Feels like ${feelsLikeCelsius}&deg;C)</p>  
          <p><i class="fas fa-tint"></i> Humidity: ${weatherData.main.humidity}%</p>
          <p><i class="fas fa-wind"></i> Wind Speed: ${weatherData.wind.speed} mph</p>
          <p><i class="fas fa-tachometer-alt"></i> Pressure: ${weatherData.main.pressure} hPa</p>
          <p><i class="fas fa-info-circle"></i> Description: ${description}</p>
          <p><i class="fas fa-map-marker-alt"></i> Coordinates: ${coordinates}</p>
          <p><i class="fas fa-flag"></i> Country Code: ${countryCode}</p>
          <p><i class="fas fa-umbrella"></i> Rain Volume: ${rainVolume}</p>
          <div class="astronomy-info">
            <p><i class="fas fa-sun"></i> Sunrise: ${sunrise}</p>
            <p><i class="fas fa-moon"></i> Sunset: ${sunset}</p>
          </div>
        </div>
      `;
    
      weatherInfo.innerHTML = weatherInfoHTML;
    }
    function renderMap(lat, lon, weatherName) {
      if (map) {
          map.remove();
          map = null;
      }

      if (lat && lon) {
          map = L.map('map').setView([lat, lon], 10);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          L.marker([lat, lon]).addTo(map)
              .bindPopup(weatherName)
              .openPopup();
      }
  }

  function removeMapContainer() {
      mapContainer.style.display = "none"; 
  }

  function showMapContainer() {
      mapContainer.style.display = "block"; 
  }
});