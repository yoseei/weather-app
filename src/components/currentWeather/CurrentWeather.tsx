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
      <p className={styles.current_time}>
        {month}月{date}日 現在時刻
      </p>
      <h2 className={styles.current_place_name}>
        {currentCityName ? currentCityName : <p>現在地</p>}
      </h2>
      <div className={styles.icon_temp_wrapper}>
        <img src={currentResult.icon} alt="icon" />
        <div>{currentResult.temp}℃</div>
      </div>
      <p className={styles.temp_data_top}>
        <span>体感温度:{currentResult.feels_like}℃</span>
        <span>最高気温:{tempMinMaxData.max_temp}℃</span>
        <span className={styles.span_third}>
          最低気温:{tempMinMaxData.min_temp}℃
        </span>
      </p>
      <p className={styles.temp_data_bottom}>
        <span style={{ color: "red" }}>|</span>
        <span>風:{currentResult.wind_speed}m/s</span>
        <span>{degWords()} </span>
        <span>気圧:{currentResult.pressure}hPa</span>
        <span>湿度:{currentResult.humidity}%</span>
      </p>
    </div>
  );
};

export default CurrentWeather;
