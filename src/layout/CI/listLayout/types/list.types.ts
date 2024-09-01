export interface WeatherForecastTypes {
    dt_txt: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        main: "Rain" | "Clear" | "Clouds" | "MostlyClouds"
    }[];
    wind: {
        speed: number;
    };
}
