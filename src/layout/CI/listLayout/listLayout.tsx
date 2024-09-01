import React, { useCallback, useEffect, useRef, useState } from "react";


import { Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { getVisibleItemCount, hasHorizontalOverflow } from "../../../utils/view.utils";
import axios from "axios";
import { WEATHER_MAP } from "../../../constant/app.constant";
import dayjs from "dayjs";
import { Card } from "../../../components/card/card";
import { WeatherForecastTypes } from "./types/list.types";

import styles from './list.module.scss'

export interface IListLayoutProps {
    lat: number,
    lng: number
}
export const ListLayout: React.FC<IListLayoutProps> = React.memo(({ lat, lng }) => {

    const contentRef = useRef<HTMLElement>(null)
    const cardRef = useRef<HTMLElement>(null)
    const nextStep = useRef<number>(1)
    const [fiveDaysLaterWeather, setFiveDaysLaterWeather] = useState<WeatherForecastTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        window.onresize = () => {
            if (!contentRef.current) return
            const canShow = hasHorizontalOverflow(contentRef.current)
            setShowButtons(canShow)
        }
    }, [])

    useEffect(() => {
        const apiKey = WEATHER_MAP

        const fetchWeather = async () => {
            try {
                const response = await axios.get(String(process.env.BASE_API_FORCAST_URL), {
                    params: {
                        lat: lat,
                        lon: lng,
                        units: 'metric',
                        appid: apiKey,
                    },
                });


                const fiveDaysLater = dayjs().add(5, 'day').format('YYYY-MM-DD');


                const fiveDaysLaterData = response.data.list.filter((forecast: WeatherForecastTypes) =>
                    forecast.dt_txt.startsWith(fiveDaysLater)
                );


                setFiveDaysLaterWeather(fiveDaysLaterData);
                setLoading(false);
            } catch {
                setError('Error fetching the weather data');
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lng]);

    const onBackStep = useCallback(() => {
        if (!contentRef.current) return
        const cardSize = (cardRef.current?.clientWidth ?? 0)
        const items = contentRef.current.querySelectorAll('.card');
        const visibleCountCards = getVisibleItemCount(contentRef.current, items)
        const maxSizeOfElement = fiveDaysLaterWeather.length * cardSize
        if (nextStep.current <= 1) nextStep.current = maxSizeOfElement
        nextStep.current = nextStep.current - cardSize * visibleCountCards
        contentRef.current?.scrollTo({ behavior: "smooth", left: nextStep.current })
    }, [fiveDaysLaterWeather?.length])

    const onForwardStep = useCallback(() => {
        if (!contentRef.current) return
        const cardSize = (cardRef.current?.clientWidth ?? 0)
        const items = contentRef.current.querySelectorAll('.card');
        const visibleCountCards = getVisibleItemCount(contentRef.current, items)
        const maxSizeOfElement = fiveDaysLaterWeather.length * cardSize
        nextStep.current = cardSize * visibleCountCards + nextStep.current
        if (nextStep.current > maxSizeOfElement) nextStep.current = 1
        contentRef.current?.scrollTo({ behavior: "smooth", left: nextStep.current })
    }, [fiveDaysLaterWeather?.length])

    if (loading || error) return null

    return (
        <main className={styles["list"]}>


            <section className={styles["list__content"]}>
                {showButtons && <Button className={styles["list__content--prev"]} variant="contained" onClick={onBackStep}>
                    <ArrowBack />
                </Button>}
                <section ref={contentRef} className={styles["list__content--cards"]}>


                    {fiveDaysLaterWeather.map(card => {
                        return <Card ref={cardRef} {...card} />
                    })}
                </section>
                {showButtons && <Button className={styles["list__content--next"]} variant="contained" onClick={onForwardStep}>
                    <ArrowForward />
                </Button>}
            </section>

        </main>
    )
})