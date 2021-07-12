import React from "react";
import styles from "./CurrentWeather.module.scss";
type PropsType = {
  result: {
    city: string;
    temp: string;
    feels_like: string;
    pressure: string;
    humidity: string;
    wind_speed: string;
    wind_deg: string | number;
    icon: string;
  };
  dailyResult: {
    min_temp: number;
    max_temp: number;
  };
  day: number;
  month: number;
};

const CurrentWeather = ({ result, day, dailyResult, month }: PropsType) => {
  const deg = result.wind_deg;

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
        体感温度:{result.feels_like}℃ 最高気温:{dailyResult.max_temp}℃ 最低気温:
        {dailyResult.min_temp}℃
      </p>
      <p>
        <span>|</span> 風:{result.wind_speed}m/s 風向き:{degWords()} 気圧:
        {result.pressure}hPa 湿度:{result.humidity}%
      </p>
    </div>
  );
};

export default CurrentWeather;
