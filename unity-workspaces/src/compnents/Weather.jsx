function Weather({ handleWeatherBtn, weatherData }) {
  return (
    <>
      <div className="weather">
        <div className="weather-top tile-top">
          <h3>Current Weather</h3>
          <button id="weather-btn" onClick={handleWeatherBtn}>
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
        <div className="weather-bottom">
          <div className="weather-summary">
            <div className="weather-summary-second">
              <div className="location-temp-wrapper">
                <h3 id="weather-location">
                  {weatherData && weatherData.name}
                  <span>
                    <h2 id="weather-temp">
                      {weatherData && Math.floor(weatherData.main.temp)}
                      <i className="fa-solid fa-o degree"></i>
                    </h2>
                  </span>
                </h3>
                <img
                  src={`https://openweathermap.org/img/wn/${
                    weatherData && weatherData.weather[0].icon
                  }@2x.png
                `}
                  id="main-icon"
                ></img>
              </div>
              <h3 id="weather-wind">
                Wind Speed
                <span>
                  {weatherData && Math.floor(weatherData.wind.speed)} mph
                </span>
              </h3>
              <h3 id="main-summary">
                Currently{" "}
                <span>{weatherData && weatherData.weather[0].main}</span>
              </h3>
              <h3 id="main-desc">
                Conditions{" "}
                <span>
                  {weatherData && weatherData.weather[0].description} now
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Weather;
