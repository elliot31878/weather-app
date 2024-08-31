import React from "react"

import styles from './header.module.scss'
import { IWeatherData } from "../../layout/CI/geolocation.types"
import { Typography } from "@mui/material"

export const Header: React.FC<IWeatherData> = React.memo((weather) => {
    console.log("weather : ", weather)
    return (
        <header className={styles["header"]}>
            <Typography variant="body1" fontWeight={"600"} className={styles["header__brand"]}>
                ❆ WeatherWave
            </Typography>
            <Typography variant="body1" fontWeight={"600"} className={styles["header__title"]}>
                ✈ {weather.name ?? "Iran, Tehran"}
            </Typography>
            <section className={styles["header__actions"]}>
                <Typography variant="body1" fontWeight={"600"} >
                    Temperature : {weather.main.temp}℃
                </Typography>
                <Typography variant="body1" fontWeight={"600"} >
                    {weather.weather[0].description}
                </Typography>
            </section>
        </header>)
})