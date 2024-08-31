import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from 'mapbox-gl';
import { MAP_BOX_TOKEN } from "../../constant/app.constant";
import debounce from "lodash/debounce";

import styles from './mapbox.module.scss'

mapboxgl.accessToken = MAP_BOX_TOKEN;

export interface IMapBoxProps {
    lat: number,
    long: number,
    onHandleChangeGeo: (lat: number, lng: number) => void
}

export const MapBox: React.FC<IMapBoxProps> = React.memo((props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<Map>();
    const [lng, setLng] = useState(props.long);
    const [lat, setLat] = useState(props.lat);
    const [zoom, setZoom] = useState(9);

    const onMove = useCallback(() => {
        if (map.current) {
            const lng = Number(map.current.getCenter().lng.toFixed(4))
            const lat = Number(map.current.getCenter().lat.toFixed(4))
            const zoom = Number(map.current.getZoom().toFixed(2))
            setLng(lng);
            setLat(lat);
            setZoom(zoom);
            props.onHandleChangeGeo(lat, lng)
        }
    }, [props])

    const debouncedFunc = debounce(onMove, 1000)

    useEffect(() => {

        if (map.current || !mapContainer.current) return;
        map.current = new Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', debouncedFunc);
    });

    return (
        <main className={styles["map-box"]}>
            <section className={styles["map-box__slide-bar"]}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </section>
            <figure ref={mapContainer} className={styles["map-box__container"]} />
        </main>
    );
})