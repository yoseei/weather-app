import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import GoogleMap from "./components/googleMap/GoogleMap";
import Recharts from "./components/recharts/Recharts";
import SearchArea from "./components/searchArea/SearchArea";
import WeeklyWeather from "./components/weeklyWeather/WeeklyWeather";

type CurrentResultStateType = {
  timezone: string;
  feels_like: string;
  humidity: string;
  pressure: string;
  temp: string;
  icon: string;
  wind_deg: string;
  wind_speed: string;
};

type tempMinMaxStateType = {
  min_temp: string;
  max_temp: string;
};
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const hour = today.getHours();

function App() {
  const apiKey = process.env.REACT_APP_OW_API_KEY;

  const [cityName, setCityName] = useState("");
  const [currentCityName, setCurrentCityName] = useState("");
  const [currentLat, setCurrentLat] = useState<any>(33.2381);
  const [currentLng, setCurrentLng] = useState<any>(131.6125);
  const [currentResult, setCurrentResult] = useState<CurrentResultStateType>({
    timezone: "",
    feels_like: "",
    humidity: "",
    pressure: "",
    temp: "",
    icon: "",
    wind_deg: "",
    wind_speed: "",
  });
  const [dailiesArray, setDailiesArray] = useState<any>([]);
  const [tempMinMaxData, setTempMinMaxData] = useState<tempMinMaxStateType>({
    min_temp: "",
    max_temp: "",
  });

  // 入力した地名から緯度経度を取得する関数
  const getLatLng = async (e: any) => {
    e.preventDefault();
    const geoCodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    try {
      const response = await axios.get(geoCodingApiUrl);
      const { data } = response;

      const currentLatLng = {
        lat: data[0].lat,
        lng: data[0].lon,
      };
      setCurrentCityName(data[0].name);
      setCurrentLat(currentLatLng.lat);
      setCurrentLng(currentLatLng.lng);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLng}&appid=${apiKey}&lang=ja&units=metric`;

    async function getWeatherDates() {
      try {
        const response = await axios.get(oneCallApiUrl);
        const { data } = response;
        console.log(data);

        // 現在の天気情報
        const currentWeatherData = {
          timezone: data.timezone,
          feels_like: data.current.feels_like,
          humidity: data.current.humidity,
          pressure: data.current.pressure,
          temp: data.current.temp,
          icon: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`,
          wind_deg: data.current.wind_deg,
          wind_speed: data.current.wind_speed,
        };
        setCurrentResult(currentWeatherData);

        // temp MIN MAXを取得
        const tempMinMaxData = {
          min_temp: data.daily[0].temp.min,
          max_temp: data.daily[0].temp.max,
        };
        setTempMinMaxData(tempMinMaxData);

        // dailies Dataを取得
        const dailiesData = [data.daily];
        setDailiesArray(dailiesData[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getWeatherDates();
  }, [apiKey, currentLat, currentLng]);

  let i = 0;
  for (i; i >= 6; i++) {
    console.log(dailiesArray[i]);
  }

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };
  return (
    <div className={styles.root}>
      <SearchArea
        cityName={cityName}
        getLatLng={getLatLng}
        handleSetCityName={handleSetCityName}
      />
      <div className={styles.middle_container}>
        <CurrentWeather
          currentResult={currentResult}
          date={date}
          month={month}
          tempMinMaxData={tempMinMaxData}
          currentCityName={currentCityName}
        />
        <GoogleMap currentLat={currentLat} currentLng={currentLng} />
      </div>
      <div className={styles.bottom_container}>
        <Recharts hour={hour} />
        <WeeklyWeather />
      </div>
    </div>
  );
}

export default App;
