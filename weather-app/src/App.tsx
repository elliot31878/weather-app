import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
  forecast: Array<{
    date: string;
    temp: number;
  }>;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    });
  }, []);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const apiKey = '8136c88e98234df64755ad52393352e7';
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: apiKey,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Weather in {weatherData?.name}</h2>
      <p>Temperature: {weatherData?.main.temp}°C</p>
      <p>Weather: {weatherData?.weather[0].description}</p>
      <button onClick={() => window.closeApp && window.closeApp(weatherData)}>Close App</button>
    </div>
  );
};

export default App;
