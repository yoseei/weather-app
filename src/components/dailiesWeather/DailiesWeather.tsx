import styles from "./DailiesWeather.module.scss";
type PropsState = {
  month: number;
  date: number;
  dailiesWeather: any;
};
const WeeklyWeather = ({ month, date, dailiesWeather }: PropsState) => {
  return (
    <div className={styles.root}>
      <h3>7日間の予測</h3>
      <div className={styles.daily_weather_container}>
        <ul>
          <li>
            <p>
              {month}月{date}日
            </p>
            <img src={dailiesWeather[0].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[0].max_temp)}/
              {Math.floor(dailiesWeather[0].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 1}日
            </p>
            <img src={dailiesWeather[1].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[1].max_temp)}/
              {Math.floor(dailiesWeather[1].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 2}日
            </p>
            <img src={dailiesWeather[2].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[2].max_temp)}/
              {Math.floor(dailiesWeather[2].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 3}日
            </p>
            <img src={dailiesWeather[3].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[3].max_temp)}/
              {Math.floor(dailiesWeather[3].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 4}日
            </p>
            <img src={dailiesWeather[4].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[4].max_temp)}/
              {Math.floor(dailiesWeather[4].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 5}日
            </p>
            <img src={dailiesWeather[5].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[5].max_temp)}/
              {Math.floor(dailiesWeather[5].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 6}日
            </p>
            <img src={dailiesWeather[6].icon} alt="icon" />
            <p>
              {Math.floor(dailiesWeather[6].max_temp)}/
              {Math.floor(dailiesWeather[6].min_temp)}℃
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyWeather;
