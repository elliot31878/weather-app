import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WEATHER_MAP } from '../constant/app.constant';

// Create a mock adapter instance
const mockAxios = new MockAdapter(axios);

// The function that performs the API call
const fetchWeatherData = async (latitude: number, longitude: number) => {
    const apiKey = WEATHER_MAP;

    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: 'metric',
        },
    });
    return response.data;
};

describe('fetchWeatherData API Call', () => {
    beforeEach(() => {
        // Reset the mock adapter before each test
        mockAxios.reset();
    });

    test('should make a GET request with correct URL and parameters', async () => {
        // Mock the API response
        const mockData = { temp: 20, weather: 'sunny' };
        mockAxios.onGet('https://api.openweathermap.org/data/2.5/weather').reply(200, mockData);

        // Call the function to test
        const latitude = 40.7128;
        const longitude = -74.0060;
        const result = await fetchWeatherData(latitude, longitude);

        // Verify the API request
        expect(mockAxios.history.get[0].url).toBe('https://api.openweathermap.org/data/2.5/weather');
        expect(mockAxios.history.get[0].params).toEqual({
            lat: latitude,
            lon: longitude,
            appid: '8136c88e98234df64755ad52393352e7',
            units: 'metric',
        });

        // Verify the response data
        expect(result).toEqual(mockData);
    });
});
