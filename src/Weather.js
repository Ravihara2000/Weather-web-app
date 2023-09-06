import "./App.css";
import { useState, useEffect } from "react";

const api = {
  key: "245b1741097b8e94dc5491434cd9d7d4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [showThreeDayForecast, setShowThreeDayForecast] = useState(false);
  const [showSevenDayForecast, setShowSevenDayForecast] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // Make a fetch call to get the weather for Colombo (default)
    fetch(`${api.base}weather?q=Colombo&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  }, []);

  const fetchWeatherByCoordinates = () => {
    if (latitude && longitude) {
      // Make a fetch call to get the weather by latitude and longitude
      fetch(
        `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setLatitude("");
          setLongitude("");
          setShowThreeDayForecast(false);
          setShowSevenDayForecast(false);
        });
    }
  };

  const fetchThreeDayForecast = () => {
    // Make a fetch call to get the 3-day forecast for the specified coordinates
    if (latitude && longitude) {
      fetch(
        `${api.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=4&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          // Filter the forecast data to get the next 3 days
          const threeDayForecastData = result.list.slice(1, 4);
          setForecast(threeDayForecastData);
          setShowThreeDayForecast(true);
          setShowSevenDayForecast(false); // Hide 7-day forecast when showing 3-day
        });
    }
  };

  const fetchSevenDayForecast = () => {
    // Make a fetch call to get the 7-day forecast for the specified coordinates
    if (latitude && longitude) {
      fetch(
        `${api.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=8&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          // Filter the forecast data to get daily data for the next 7 days
          const sevenDayForecastData = result.list.filter(
            (reading, index) => index % 8 === 0
          );
          setForecast(sevenDayForecastData);
          setShowSevenDayForecast(true);
          setShowThreeDayForecast(false); // Hide 3-day forecast when showing 7-day
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        <div className="location-input">
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button onClick={fetchWeatherByCoordinates}>Search by Coordinates</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <p>Location: {weather.name}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
            <button onClick={fetchThreeDayForecast}>View 3-Day Forecast</button>
            <button onClick={fetchSevenDayForecast}>View 7-Day Forecast</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {showThreeDayForecast && forecast.length > 0 && (
          <div className="forecast-container">
            <h2>3-Day Forecast</h2>
            <div className="forecast">
              {forecast.map((day) => (
                <div className="forecast-card" key={day.dt}>
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <p>{day.main.temp}°C</p>
                  <p>{day.weather[0].main}</p>
                  <p>({day.weather[0].description})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showSevenDayForecast && forecast.length > 0 && (
          <div className="forecast-container">
            <h2>7-Day Forecast</h2>
            <div className="forecast">
              {forecast.map((day) => (
                <div className="forecast-card" key={day.dt}>
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <p>{day.main.temp}°C</p>
                  <p>{day.weather[0].main}</p>
                  <p>({day.weather[0].description})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
