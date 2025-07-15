const data = {
    "coord": { "lon": 80.2785, "lat": 13.0878 },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 37.93,
        "feels_like": 44.93,
        "temp_min": 37.93,
        "temp_max": 37.93,
        "pressure": 1003,
        "humidity": 54,
        "sea_level": 1003,
        "grnd_level": 1002
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.69,
        "deg": 122,
        "gust": 6.69
    },
    "clouds": {
        "all": 100
    },
    "dt": 1752484432,
    "sys": {
        "country": "IN",
        "sunrise": 1752452377,
        "sunset": 1752498565
    },
    "timezone": 19800,
    "id": 1264527,
    "name": "Chennai",
    "cod": 200
}

import  { useState, useEffect } from 'react';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("chennai");

  const API_KEY = "985f60bdb3bc15276124c9627c35b72d";

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div>
      <h1>Weather in {city}</h1>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
