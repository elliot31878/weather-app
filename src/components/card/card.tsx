import { Typography } from "@mui/material";
import React from "react";
import { WeatherForecastTypes } from "../../layout/CI/listLayout/types/list.types";

import { WEATHER_CLEAR, WEATHER_CLOUDY, WEATHER_LOW_CLOUDY, wEATHER_RAINY } from "../../constant/icons.constant";

import styles from './card.module.scss'


const WEATHER_STATUS = {
    "Rain": wEATHER_RAINY,
    "Clear": WEATHER_CLEAR,
    "Clouds": WEATHER_CLOUDY,
    "MostlyClouds": WEATHER_LOW_CLOUDY,
}
export const Card = React.forwardRef<HTMLElement, WeatherForecastTypes>((card, cardRef) => {

    return (<figure key={card.dt_txt} ref={cardRef} className={`card ${styles["card"]}`}>
        <Typography variant="body1" className={styles["card__title"]}>Today</Typography>

        <Typography variant="caption" className={styles["card__title"]}>{card.dt_txt}</Typography>
        <img alt="weather" className={styles["card__logo"]} src={WEATHER_STATUS[card.weather[0].main]} />
        <Typography variant="body1" className={styles["card__temp"]}>{card.main.temp}°C</Typography>
    </figure>)
})