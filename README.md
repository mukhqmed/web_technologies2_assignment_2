# Weather App

## Overview

This Weather App provides users with current weather information for a specific city, including temperature, humidity, wind speed, pressure, description, coordinates, country code, rain volume, sunrise time, and sunset time. Additionally, it displays the current time based on the city's timezone and shows a map with the city's location.

## Technologies Used

- HTML
- CSS
- JavaScript
- Leaflet.js (for map display)
- OpenWeatherMap API (for weather data)
- Sunrise-Sunset API (for astronomy data)
- TimezoneDB API (for timezone data)
- Express.js (for server-side functionality)

## Setup Instructions

1. Clone the repository:

2. Navigate to the project directory:
   
3. Install dependencies:


4. Start the server:


5. Open a web browser and go to http://localhost:3000

## API Usage

- OpenWeatherMap API: Provides weather data for a given city. Used to retrieve temperature, humidity, wind speed, pressure, description, coordinates, country code, and rain volume.

- Sunrise-Sunset API: Provides sunrise and sunset times for a given location (latitude and longitude). Used to retrieve sunrise and sunset times based on the city's coordinates.

- TimezoneDB API: Provides timezone information for a given location (latitude and longitude). Used to determine the city's timezone and display the current time accordingly.

## Key Design Decisions

- **User Interface**: The app features a simple and intuitive user interface with a single input field for entering the city name and a "Get Weather" button for fetching weather data.

- **Map Display**: The app utilizes Leaflet.js to display a map with the city's location marked by a marker. This provides users with a visual representation of the city's geographical coordinates.

- **Error Handling**: The app includes error handling to handle cases where the user enters an invalid city name or encounters issues with fetching weather data. Error messages are displayed to notify the user of any issues.

- **Asynchronous Data Fetching**: The app uses asynchronous JavaScript functions and the `async/await` syntax to fetch weather, astronomy, and timezone data from external APIs. This ensures that the app remains responsive while fetching data asynchronously.

## Additional Notes

- The app's design is responsive and adjusts to different screen sizes using media queries in the CSS stylesheet.

- The app is built using the Express.js framework for server-side functionality, allowing it to handle HTTP requests and serve static files.

- The app's dependencies are managed using npm, and the server is started using the `npm start` command.

- Feel free to explore and modify the code to customize the app according to your requirements.


