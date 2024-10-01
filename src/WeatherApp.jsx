import React, { useState } from 'react';
import './WeatherApp.css';
import {apiKey} from './API_KEY';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');



    const getWeather = () => {
        if (city.trim() === '') {
            setError('Please enter a city name.');
            setWeather(null);
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        console.log(`Fetching weather data from: ${url}`); 

        fetch(url)
            .then((response) => {
                console.log(`Response received:`, response); 
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then((data) => {
                console.log(`Data received:`, data); 
                setError('');
                setWeather({
                    cityName: data.name,
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                });
            })
            .catch((error) => {
                console.error(`Error occurred:`, error); 
                setWeather(null);
                setError(error.message);
            });
    };

    return (
        <div className="weather-app">
            <h1>City Weather</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
            />
            <button onClick={getWeather}>Get Weather</button>

            {error && <p className="error-message">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>Weather in {weather.cityName}</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Description: {weather.description}</p>
                    <p>Humidity: {weather.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
