### 2. Weather App

- **Technology**: React with Vite
- **Purpose**: To display the user’s current location and weather-related details, including forecasts.
- **Implementation**:
  - **React**: Used for building the user interface.
  - **Vite**: Chosen for its fast performance and ease of use as a development server and build tool.
  - **Axios**: For making API requests to fetch weather data from the OpenWeather API.
  - **OpenWeather API**: Provides current weather and forecast data.
  - **Mapbox**: Used to show the user's location on a map and interact with it to change weather data based on location.
  - **Day.js**: For managing and displaying dates and times related to weather forecasts.

## Key Decisions and Reasoning

### 1. Technology Choices

- **React and Vite**:

  - **React**: Provides a robust framework for building interactive user interfaces efficiently.
  - **Vite**: Selected for its speed and simplicity in the development process.

- **Axios**:

  - **Reason**: A popular and well-documented HTTP client for making API requests, simplifying handling asynchronous operations.

- **OpenWeather API**:

  - **Reason**: Offers comprehensive weather data with a straightforward API, suitable for both current weather and forecasts.

- **Mapbox**:

  - **Reason**: Provides detailed and interactive maps, essential for displaying and updating the user's location.

- **Day.js**:
  - **Reason**: A lightweight and easy-to-use date library for managing weather forecast data and timestamps.

### 2. Handling the Weather App in the Landing Page

- **Dynamic Loading**:

  - **Reason**: The weather app is loaded dynamically when the user clicks a button. This ensures the initial load time of the landing page remains fast, with the React app only loading when needed.

- **Bundling and Deployment**:
  - **Reason**: The React app is built and bundled using Vite and deployed separately from the landing page. The `bundle.js` file is referenced in the landing page’s HTML to load the React app.

### 3. Deployment Strategy

- **Firebase Hosting**:

  - **Reason**: Firebase provides reliable hosting for static and dynamic content with easy deployment through the Firebase CLI.

- **GitHub Actions**:
  - **Reason**: Automated deployment using GitHub Actions ensures that every push to the repository triggers a deployment to Firebase, streamlining the development workflow.

## Testing

- **Jest**:

  - **Reason**: Used for unit testing to ensure the reliability of React components and their interactions.

- **End-to-End (E2E) Testing**:
  - **Reason**: Not implemented in this initial version but recommended for future improvements to test the complete workflow of user interactions.

## Future Improvements

- **E2E Testing**: Integrate end-to-end testing frameworks like Cypress to test the entire flow from the landing page to the weather app.
- **Accessibility Enhancements**: Ensure both the landing page and weather app are fully accessible to users with disabilities.
- **Performance Optimization**: Optimize performance based on user feedback and analytics, particularly focusing on load times and responsiveness.

Website link : https://weather-app-c1a15.web.app/
