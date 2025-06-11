// WEATHER APP

const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");

// Get your own API key at https://api.openweathermap.org
const apiKey = "";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) throw new Error("Could not fetch weather data.");
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { humidity, temp },
    weather: [{ id, description }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  createEl("h1", "city-display", city, card);
  const tempText = `${Math.round(temp - 273.15).toFixed(1)} °C`;
  createEl("p", "temp-display", tempText, card);
  const humidityText = `Humidity: ${humidity}%`;
  createEl("p", "humidity-display", humidityText, card);
  createEl("p", "desc-display", description, card);
  const emojiText = getWeatherEmoji(id);
  createEl("p", "weather-emoji", emojiText, card);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌦️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  createEl("p", "error-display", message, card);
}

function createEl(type, className, text, parent) {
  const el = document.createElement(type);
  el.classList.add(className);
  el.textContent = text;
  parent.appendChild(el);
}
