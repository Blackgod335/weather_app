import { useEffect, useState } from "react";
import './Home.css';
import API from '../../utils/weatherApi';

const Home = () => {
    const [weatherData, setWeather] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [city, setCity] = useState('chennai');
    const [currenttime, setTime] = useState(new Date());

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await API(city);
                setWeather(data);
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        };

        fetchWeather();
    }, [city]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(searchInput);
        setSearchInput('')
    };

    const formattedTime = currenttime.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    return (
        <div>
            <h1 className="title">Weather Search</h1>
            <p className="time">{formattedTime}</p>
            <div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="city"
                        value={searchInput}
                        onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <br /><br />
            <div className="weather-container">
                {weatherData?.main ? (
                    <div className="weather-card">
                        <h2 className="city-name">
                            {weatherData.name}, {weatherData.sys.country}
                        </h2>
                        <p className="temperature">
                            🌡 Temperature: <span>{weatherData.main.temp}°C</span>
                        </p>
                        <p className="feels-like">
                            🔥 Feels Like: <span>{weatherData.main.feels_like}°C</span>
                        </p>
                        <p className="condition">
                            ☁️ Condition: <span>{weatherData.weather[0].description}</span>
                        </p>
                        <p className="humidity">
                            💧 Humidity: <span>{weatherData.main.humidity}%</span>
                        </p>
                        <p className="wind">
                            💨 Wind Speed: <span>{weatherData.wind.speed} m/s</span>
                        </p>
                    </div>
                ) : (
                    <p className="loading-text">Loading weather data...</p>
                )}
            </div>

        </div>
    );
};

export default Home;
