import React, { useState } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import GoogleMap from "./components/googleMap/GoogleMap";
import Recharts from "./components/recharts/Recharts";
import SearchArea from "./components/searchArea/SearchArea";

type ResultStateType = {
  lon: string;
  lat: string;
  city: string;
  icon: string;
  temp: string;
  feelsLike: string;
  tempMax: string;
  tempMin: string;
  windSpeed: string;
  windDeg: string;
  pressure: string;
  humidity: string;
};

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const hour = today.getHours();

function App() {
  const [cityName, setCityName] = useState("");
  const [currentResult, setCurrentResult] = useState<ResultStateType>({
    lon: "",
    lat: "",
    city: "",
    icon: "",
    temp: "",
    feelsLike: "",
    tempMax: "",
    tempMin: "",
    windSpeed: "",
    windDeg: "",
    pressure: "",
    humidity: "",
  });

  const getCurrentWeather = async (e: any) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_OW_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ja`;

    try {
      const response = await axios.get(url);
      const { data } = response;
      const currentWeatherData = {
        lon: data.coord.lon,
        lat: data.coord.lat,
        city: data.name,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      };
      setCurrentResult(currentWeatherData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };

  console.log(currentResult);

  return (
    <div className={styles.root}>
      <SearchArea
        cityName={cityName}
        getCurrentWeather={getCurrentWeather}
        handleSetCityName={handleSetCityName}
      />
      <div className={styles.middle_container}>
        <CurrentWeather result={currentResult} day={day} month={month} />
        <GoogleMap currentResult={currentResult} />
      </div>
      <div className={styles.bottom_container}>
        <Recharts hour={hour} />
      </div>
    </div>
  );
}

export default App;
