import React, { useCallback, useEffect, useState } from "react"
import { MapBox } from "../../../components/mapbox/mapbox"
import { Header } from "../../../components/header/header"
import { TEHRAN_LAT_LONG, WEATHER_MAP } from "../../../constant/app.constant";
import axios from "axios";
import { IWeatherData } from "./types/geolocation.types";



import styles from './weather.module.scss'

export interface IWeatherLayoutProps {
    callback: (lat: number, lng: number) => void
}
export const WeatherLayout: React.FC<IWeatherLayoutProps> = React.memo(({ callback }) => {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [lat, setLat] = useState(TEHRAN_LAT_LONG.LAT);
    const [lng, setLng] = useState(TEHRAN_LAT_LONG.LONG);

    const fetchWeatherData = useCallback(async (latitude: number, longitude: number) => {
        const apiKey = WEATHER_MAP;
        const response = await axios.get(String(process.env.BASE_API_WEATHER_URL), {
            params: {
                lat: latitude,
                lon: longitude,
                appid: apiKey,
                units: 'metric',
            },
        });
        callback(latitude, longitude)
        setWeatherData(response.data);
        setLat(latitude)
        setLng(longitude)
        setLoading(false);
    }, [callback])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);

        }, () => {
            fetchWeatherData(TEHRAN_LAT_LONG.LAT, TEHRAN_LAT_LONG.LONG);
        });

    }, [fetchWeatherData]);



    const onHandleChangeGeo = useCallback((lat: number, lng: number) => {
        fetchWeatherData(lat, lng)
    }, [fetchWeatherData])

    const handleClose = () => {
        // Pass weather data to the parent window
        if (weatherData) {
            window.parent.postMessage({
                type: 'weatherData',
                weather: {
                    location: weatherData.name,
                    temperature: `${weatherData.main.temp}°C`,
                    description: weatherData.weather[0].description,
                    lastUpdated: new Date().toLocaleString(),
                },
            }, '*');
        }
    };
    if (loading) return null

    return (
        <main className={styles["weather-main"]}>
            {weatherData && <Header handleClose={handleClose} {...weatherData} />}
            <MapBox onHandleChangeGeo={onHandleChangeGeo} lat={lat} long={lng} />
        </main>
    )
})