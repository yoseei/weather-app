import React from "react";
import styles from "./CurrentWeather.module.scss";
type PropsType = {
  currentResult: {
    timezone: string;
    feels_like: string;
    humidity: string;
    pressure: string;
    temp: string;
    icon: string;
    wind_deg: any;
    wind_speed: string;
  };
  tempMinMaxData: {
    min_temp: string;
    max_temp: string;
  };
  date: number;
  month: number;
  currentCityName: string;
};

const CurrentWeather = ({
  currentResult,
  date,
  tempMinMaxData,
  month,
  currentCityName,
}: PropsType) => {
  const deg = currentResult.wind_deg;

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
        {month}月{date}日 現在時刻
      </p>
      <h2>{currentCityName ? currentCityName : <p>現在地</p>}</h2>
      <img src={currentResult.icon} alt="icon" />
      <div>{currentResult.temp}℃</div>
      <p>
        体感温度:{currentResult.feels_like}℃ 最高気温:{tempMinMaxData.max_temp}℃
        最低気温:
        {tempMinMaxData.min_temp}℃
      </p>
      <p>
        <span>|</span> 風:{currentResult.wind_speed}m/s 風向き:{degWords()}{" "}
        気圧:
        {currentResult.pressure}hPa 湿度:{currentResult.humidity}%
      </p>
    </div>
  );
};

export default CurrentWeather;
