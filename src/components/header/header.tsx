import React from "react"

import styles from './header.module.scss'
import { IWeatherData } from "../../layout/CI/weatherLayout/types/geolocation.types"
import { Button, Typography, useMediaQuery } from "@mui/material"
import { CloseOutlined } from "@mui/icons-material"

export type IWeatherHeaderProps = {
    handleClose: () => void
} & IWeatherData

export const Header: React.FC<IWeatherHeaderProps> = React.memo((weather) => {

    const isMobileQuery = useMediaQuery("(max-width:800px)");

    return (
        <header className={styles["header"]}>
            <Button onClick={weather.handleClose} className={styles["header__close"]} variant="text">
                <CloseOutlined />
            </Button>
            <Typography variant={isMobileQuery ? "caption" : "body1"} fontWeight={"600"} className={styles["header__brand"]}>
                ❆ WeatherWave
            </Typography>
            <Typography variant={isMobileQuery ? "caption" : "body1"} fontWeight={"600"} className={styles["header__title"]}>
                ✈ {weather.name ?? "Iran, Tehran"}
            </Typography>
            <section className={styles["header__actions"]}>
                <Typography variant={isMobileQuery ? "caption" : "body1"} fontWeight={"600"} >
                    {isMobileQuery ? `Temp ${weather.main.temp} °C` : `Temperature : ${weather.main.temp} °C`}`
                </Typography>
                {!isMobileQuery && <Typography variant="body1" fontWeight={"600"} >
                    {weather.weather[0].description}
                </Typography>}
            </section>
        </header>)
})