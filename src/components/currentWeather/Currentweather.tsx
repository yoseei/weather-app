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
    windDeg: string | number;
    pressure: string;
    humidity: string;
  };
  day: number;
  month: number;
};

const CurrentWeather = ({ result, day, month }: PropsType) => {
  const deg = result.windDeg;

  const degWords = () => {
    if (deg >= 1 && deg <= 45) {
      return "北寄りの風";
    } else if (deg >= 46 && deg <= 135) {
      return "東寄りの風";
    } else if (deg >= 136 && deg <= 225) {
      return "南寄りの風";
    } else if (deg >= 226 && deg <= 315) {
      return "西寄りの風";
    } else if (deg >= 316 && deg <= 360) {
      return "北寄りの風";
    } else {
      return "";
    }
  };

  return (
    <div className={styles.root}>
      <p>
        {month}月{day}日 現在時刻
      </p>
      <h2>{result.city}</h2>
      <img src={result.icon} alt="icon" />
      <div>{result.temp}℃</div>
      <p>
        体感温度:{result.feelsLike}℃ 最高気温:{result.tempMax}℃ 最低気温:
        {result.tempMin}℃
      </p>
      <p>
        <span>|</span> 風:{result.windSpeed}m/s 風向き:{degWords()} 気圧:
        {result.pressure}hPa 湿度:{result.humidity}%
      </p>
    </div>
  );
};

export default CurrentWeather;
