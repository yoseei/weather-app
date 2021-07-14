import styles from "./WeeklyWeather.module.scss";
const WeeklyWeather = () => {
  return (
    <div className={styles.root}>
      <h3>7日間の予測</h3>
      <div className={styles.daily_weather_container}>
        <p>(日付)</p>
        <p>(icon)</p>
        <p>(Max/Min ℃)</p>
      </div>
    </div>
  );
};

export default WeeklyWeather;
