import React, { useState } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import GoogleMap from "./components/googleMap/GoogleMap";
import Recharts from "./components/recharts/Recharts";
import SearchArea from "./components/searchArea/SearchArea";

type ResultStateType = {
  lat: number;
  lon: number;
  city: string;
  temp: string;
  feels_like: string;
  pressure: string;
  humidity: string;
  wind_speed: string;
  wind_deg: string | number;
  icon: string;
};

type DailyResultStateType = {
  min_temp: number;
  max_temp: number;
};
const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const hour = today.getHours();

function App() {
  const [cityName, setCityName] = useState("");
  const [currentResult, setCurrentResult] = useState<ResultStateType>({
    lat: 0,
    lon: 0,
    city: "",
    temp: "",
    feels_like: "",
    pressure: "",
    humidity: "",
    wind_speed: "",
    wind_deg: "",
    icon: "",
  });
  const [dailyResult, setDailyResult] = useState<DailyResultStateType>({
    min_temp: 0,
    max_temp: 0,
  });

  const getCurrentWeather = async (e: any) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_OW_API_KEY;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ja`;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=94.04&appid=${apiKey}&lang=ja&units=metric`;
    try {
      const response = await axios.get(url);
      const { data } = response;

      const currentWeatherData = {
        lat: data.lat,
        lon: data.lon,
        city: data.timezone,
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        pressure: data.current.pressure,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        wind_deg: data.current.wind_deg,
        icon: `http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`,
      };
      const DailyWeatherData = {
        min_temp: data.daily[0].temp.min,
        max_temp: data.daily[0].temp.max,
      };
      setCurrentResult(currentWeatherData);
      setDailyResult(DailyWeatherData);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(currentResult);
  console.log(dailyResult);

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };
  return (
    <div className={styles.root}>
      <SearchArea
        cityName={cityName}
        getCurrentWeather={getCurrentWeather}
        handleSetCityName={handleSetCityName}
      />
      <div className={styles.middle_container}>
        <CurrentWeather
          result={currentResult}
          day={day}
          month={month}
          dailyResult={dailyResult}
        />
        <GoogleMap currentResult={currentResult} />
      </div>
      <div className={styles.bottom_container}>
        <Recharts hour={hour} />
      </div>
    </div>
  );
}

export default App;
