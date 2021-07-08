import React from "react";
import styles from "./CurrnetWeather.module.scss";
const Currentweather = () => {
  return (
    <div className={styles.root}>
      <p>(７月８日) 現在時刻</p>
      <h2>(地名)</h2>
      <div>(天気アイコン) （31.87℃）</div>
      <p>体感温度： (36.77℃) 最高気温： (32.3℃) 最低気温： (24.74℃)</p>
      <p>
        <span>|</span> 風：(3.04m/s) (西寄りの風) 気圧：(1008hPa) 湿度：(60%)
      </p>
    </div>
  );
};

export default Currentweather;
