import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

import search_icon from "../assets/search.png";
import clearday_icon from "../assets/clearday.png";
import clearnight_icon from "../assets/clearnight.png";
import fewcloudsday_icon from "../assets/fewcloudsday.png";
import fewcloudsnight_icon from "../assets/fewcloudsnight.png";
import brokencloudsday_icon from "../assets/brokencloudsday.png";
import brokencloudsnight_icon from "../assets/brokencloudsnight.png";
import scatteredclouds_icon from "../assets/scatteredclouds.png";
import lightrainday_icon from "../assets/lightrainday.png";
import lightrainnight_icon from "../assets/lightrainnight.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import thunderstorm_icon from "../assets/thunderstorm.png";
import sunrise_icon from "../assets/sunrise.png";
import sunset_icon from "../assets/sunset.png";

export default function WeatherApp() {
  const sunrise = document.getElementsByClassName("sunrise");
  const sunset = document.getElementsByClassName("sunset");
  const temperature = document.getElementsByClassName("weather-temp");
  const location = document.getElementsByClassName("weather-location");

  let api_key = "aaf1e04e50f0f451f7db8aa0f763a0aa";
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=Metric&appid=${api_key}`
  );

  const [wicon, setWicon] = useState("");

  function handleSearch() {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value == "") {
      return 0;
    }
    setUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    );
  }

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        let sunriseData = data.sys.sunrise;
        let sunsetData = data.sys.sunset;

        let sunriseDateObj = new Date(sunriseData * 1000);
        let sunsetDateObj = new Date(sunsetData * 1000);
        let sunriseHours = sunriseDateObj.getUTCHours();
        let sunriseMinutes = sunriseDateObj.getUTCMinutes();
        let sunsetHours = sunsetDateObj.getUTCHours();
        let sunsetMinutes = sunriseDateObj.getUTCMinutes();

        let sunriseFormatted =
          sunriseHours.toString().padStart(2, 0) +
          ":" +
          sunriseMinutes.toString().padStart(2, 0);

        let sunsetFormatted =
          sunsetHours.toString().padStart(2, 0) +
          ":" +
          sunsetMinutes.toString().padStart(2, 0);

        sunrise[0].innerHTML = sunriseFormatted;
        sunset[0].innerHTML = sunsetFormatted;
        temperature[0].innerHTML = Math.round(data.main.temp) + " °C";
        location[0].innerHTML = data.name;

        switch (data.weather[0].icon) {
          case "01d":
            setWicon(clearday_icon);
            break;
          case "01n":
            setWicon(clearnight_icon);
            break;
          case "02d":
            setWicon(fewcloudsday_icon);
            break;
          case "02n":
            setWicon(fewcloudsnight_icon);
            break;
          case "03d":
            setWicon(scatteredclouds_icon);
            break;
          case "03n":
            setWicon(scatteredclouds_icon);
            break;
          case "04d":
            setWicon(brokencloudsday_icon);
            break;
          case "04n":
            setWicon(brokencloudsnight_icon);
            break;
          case "09d":
            setWicon(lightrainday_icon);
            break;
          case "09n":
            setWicon(lightrainnight_icon);
            break;
          case "10d":
            setWicon(rain_icon);
            break;
          case "10n":
            setWicon(rain_icon);
            break;
          case "11d":
            setWicon(thunderstorm_icon);
            break;
          case "11n":
            setWicon(thunderstorm_icon);
            break;
          case "13d":
            setWicon(snow_icon);
            break;
          default:
            setWicon(cloud_icon);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong with the request");
      });
  }, [url]);

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <button className="search-icon" onClick={handleSearch}>
          <img src={search_icon} alt="" />
        </button>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">Stockholm</div>
      <div className="data-container">
        <div className="element">
          <img src={sunrise_icon} alt="" className="icon" />
          <div className="data">
            <div className="text">Sunrise</div>
            <div className="sunrise">07:12</div>
          </div>
        </div>
        <div className="element">
          <img src={sunset_icon} alt="" className="icon" />
          <div className="data">
            <div className="text">Sunset</div>
            <div className="sunset">22:36</div>
          </div>
        </div>
      </div>
    </div>
  );
}
