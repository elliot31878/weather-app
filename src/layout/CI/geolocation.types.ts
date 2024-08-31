export interface IWeatherData {
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

