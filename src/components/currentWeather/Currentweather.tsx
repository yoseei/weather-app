import React from "react";
import styles from "./CurrentWeather.module.scss";
type PropsType = {
  result: {
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
};
const CurrentWeather = ({ result }: PropsType) => {
  return (
    <div className={styles.root}>
      <p>(７月８日) 現在時刻</p>
      <h2>{result.city}</h2>
      <img src={result.icon} alt="icon" />
      <div>{result.temp}</div>
      <p>
        体感温度： {result.feelsLike} 最高気温： {result.tempMax} 最低気温：
        {result.tempMin}
      </p>
      <p>
        <span>|</span> 風：{result.windSpeed} 風向き：{result.windDeg} 気圧：
        {result.pressure} 湿度：{result.humidity}
      </p>
    </div>
  );
};

export default CurrentWeather;
