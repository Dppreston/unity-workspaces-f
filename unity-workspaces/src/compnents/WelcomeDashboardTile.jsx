import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import Date from "./Date";

const weatherAPIKey = "9054241f22ed1bd320dbc70f2a7376c5";

function WelcomeDashboardTile() {
  const [position, setPosition] = useState("");
  const [weatherData, setWeatherData] = useState("");

  //geo check

  const geoCheck = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  //fetch weather

  const weatherCheck = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${weatherAPIKey}&units=imperial`
      );
      setWeatherData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //weather refresh button

  const handleWeatherBtn = (e) => {
    e.preventDefault();
    if (e) {
      weatherCheck();
    }
  };

  useEffect(() => {
    geoCheck();
  }, []);

  useEffect(() => {
    weatherCheck();
  }, [position]);

  return (
    <>
      <div className="welcome-dashboard">
        <div className="weather-cont">
          {!weatherData ? (
            <h3 className="weather-loading">Loading Weather...</h3>
          ) : (
            <Weather
              handleWeatherBtn={handleWeatherBtn}
              weatherData={weatherData}
            />
          )}
        </div>
        <div className="date-cont">
          <Date />
        </div>
      </div>
    </>
  );
}
export default WelcomeDashboardTile;
