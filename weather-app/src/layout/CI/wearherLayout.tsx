import React, { useCallback, useEffect, useState } from "react"
import { MapBox } from "../../components/mapbox/mapbox"
import { Header } from "../../components/header/header"
import { TEHRAN_LAT_LONG, WEATHER_MAP } from "../../constant/app.constant";
import axios from "axios";
import { IWeatherData } from "./geolocation.types";

import styles from './weather.module.scss'
import { Button } from "@mui/material";

export const WeatherLayout: React.FC = React.memo(() => {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [lat, setLat] = useState(TEHRAN_LAT_LONG.LAT);
    const [lng, setLng] = useState(TEHRAN_LAT_LONG.LONG);


    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {

            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
        }, () => {

            fetchWeatherData(TEHRAN_LAT_LONG.LAT, TEHRAN_LAT_LONG.LONG);
        });

    }, []);

    const fetchWeatherData = async (latitude: number, longitude: number) => {
        const apiKey = WEATHER_MAP;
        const response = await axios.get(String(process.env.BASE_API_WEATHER_URL), {
            params: {
                lat: latitude,
                lon: longitude,
                appid: apiKey,
                units: 'metric',
            },
        });

        setWeatherData(response.data);
        setLat(latitude)
        setLng(longitude)
        setLoading(false);

    }

    const onHandleChangeGeo = useCallback((lat: number, lng: number) => {
        fetchWeatherData(lat, lng)
    }, [])

    if (loading) return null

    return (
        <main className={styles["weather-main"]}>
            {weatherData && <Header {...weatherData} />}
            <MapBox onHandleChangeGeo={onHandleChangeGeo} lat={lat} long={lng} />
            <Button onClick={() => window.closeApp && window.closeApp(weatherData)}>Close App</Button>
        </main>
    )
})