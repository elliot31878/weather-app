import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WEATHER_MAP } from '../constant/app.constant';

// Initialize the mock adapter for axios
const mockAxios = new MockAdapter(axios);

// Define the function to test
const fetchWeatherForecast = async (lat: number, lng: number) => {
    const apiKey = WEATHER_MAP
    const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
            lat: lat,
            lon: lng,
            units: 'metric',
            appid: apiKey,
        },
    });
    return response.data;
};

describe('fetchWeatherForecast API Call', () => {
    beforeEach(() => {
        // Reset the mock adapter before each test
        mockAxios.reset();
    });

    test('should make a GET request with the correct URL and parameters', async () => {
        // Mock the API response
        const mockData = { list: [{ temp: 20, weather: 'sunny' }] };
        mockAxios.onGet('https://api.openweathermap.org/data/2.5/forecast').reply(200, mockData);

        // Define test parameters
        const latitude = 40.7128;
        const longitude = -74.0060;

        // Call the function
        const result = await fetchWeatherForecast(latitude, longitude);

        // Assert the request URL and parameters
        expect(mockAxios.history.get[0].url).toBe('https://api.openweathermap.org/data/2.5/forecast');
        expect(mockAxios.history.get[0].params).toEqual({
            lat: latitude,
            lon: longitude,
            units: 'metric',
            appid: WEATHER_MAP,
        });

        // Assert the response data
        expect(result).toEqual(mockData);
    });
});
