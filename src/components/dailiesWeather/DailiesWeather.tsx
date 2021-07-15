import styles from "./DailiesWeather.module.scss";
type PropsState = {
  month: number;
  date: number;
  dailiesMaxTemp: any;
  dailiesMinTemp: any;
  dailiesIcon: any;
};
const WeeklyWeather = ({
  month,
  date,
  dailiesMaxTemp,
  dailiesMinTemp,
  dailiesIcon,
}: PropsState) => {
  // console.log(dailiesWeather[0].icon);
  return (
    <div className={styles.root}>
      <h3>7日間の予測</h3>
      <div className={styles.daily_weather_container}>
        <ul>
          <li>
            <p>
              {month}月{date}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[0]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[0])}/{Math.floor(dailiesMinTemp[0])}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 1}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[1]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[1])}/{Math.floor(dailiesMinTemp[1])}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 2}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[2]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[2])}/{Math.floor(dailiesMinTemp[2])}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 3}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[3]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[3])}/{Math.floor(dailiesMinTemp[3])}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 4}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[4]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[4])}/{Math.floor(dailiesMinTemp[4])}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 5}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[5]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[5])}/{Math.floor(dailiesMinTemp[5])}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 6}日
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${dailiesIcon[6]}.png`}
              alt="お天気アイコン"
            />
            <p>
              {Math.floor(dailiesMaxTemp[6])}/{Math.floor(dailiesMinTemp[6])}℃
            </p>
          </li>
          {/* <li>
            <p>
              {month}月{date + 2}日
            </p>
            <img src={dailiesWeather[2].icon} alt="お天気アイコン" />
            <p>
              {Math.floor(dailiesWeather[2].max_temp)}/
              {Math.floor(dailiesWeather[2].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 3}日
            </p>
            <img src={dailiesWeather[3].icon} alt="お天気アイコン" />
            <p>
              {Math.floor(dailiesWeather[3].max_temp)}/
              {Math.floor(dailiesWeather[3].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 4}日
            </p>
            <img src={dailiesWeather[4].icon} alt="お天気アイコン" />
            <p>
              {Math.floor(dailiesWeather[4].max_temp)}/
              {Math.floor(dailiesWeather[4].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 5}日
            </p>
            <img src={dailiesWeather[5].icon} alt="お天気アイコン" />
            <p>
              {Math.floor(dailiesWeather[5].max_temp)}/
              {Math.floor(dailiesWeather[5].min_temp)}℃
            </p>
          </li>
          <li>
            <p>
              {month}月{date + 6}日
            </p>
            <img src={dailiesWeather[6].icon} alt="お天気アイコン" />
            <p>
              {Math.floor(dailiesWeather[6].max_temp)}/
              {Math.floor(dailiesWeather[6].min_temp)}℃
            </p>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyWeather;
