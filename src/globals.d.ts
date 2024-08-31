export { };

declare global {
    interface Window {
        closeApp: (weatherData: WeatherData) => void;
    }
}
