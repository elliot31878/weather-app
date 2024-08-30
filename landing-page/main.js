document.getElementById('loadWeatherApp').addEventListener('click', () => {
    const container = document.getElementById('weatherAppContainer');
    container.innerHTML = '<div id="react-root"></div>';

    const script = document.createElement('script');
    script.src = 'http://localhost:3000/static/js/bundle.js'; // Adjust this URL based on your React app's build
    document.body.appendChild(script);
});

function displayWeatherSummary(weatherData) {
    const summaryContainer = document.getElementById('weatherSummary');
    summaryContainer.classList.remove('hidden');
    summaryContainer.innerHTML = `
        <h2>Weather Summary</h2>
        <p>Location: ${weatherData.location}</p>
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Last Updated: ${new Date(weatherData.lastUpdated).toLocaleTimeString()}</p>
    `;
}

window.closeApp = function (weatherData) {
    const container = document.getElementById('weatherAppContainer');
    container.innerHTML = ''; // Remove the React app
    displayWeatherSummary(weatherData);
};
