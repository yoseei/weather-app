import { useState } from "react";
import styles from "./SearchArea.module.scss";

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
const SearchArea = () => {
  const [cityName, setCityName] = useState("");
  const [result, setResult] = useState<ResultStateType>({
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

  const getData = (e: any) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_OW_API_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ja`
    )
      .then((res) => res.json())
      .then((data) =>
        setResult({
          lon: data.coord.lon,
          lat: data.coord.lat,
          city: data.name,
          icon: data.weather.icon,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          tempMax: data.main.temp_max,
          tempMin: data.main.temp_min,
          windSpeed: data.wind.speed,
          windDeg: data.wind.deg,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        })
      );
    console.log(result);
  };

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>都市名</h3>
          <input
            value={cityName}
            onChange={handleSetCityName}
            type="text"
            placeholder="(例)東京"
          />
          <button onClick={getData}>検索する</button>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
