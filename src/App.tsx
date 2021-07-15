import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import GoogleMap from "./components/googleMap/GoogleMap";
import Recharts from "./components/recharts/Recharts";
import SearchArea from "./components/searchArea/SearchArea";
import DailiesWeather from "./components/dailiesWeather/DailiesWeather";

type CurrentResultStateType = {
  timezone: string;
  feels_like: string;
  humidity: string;
  pressure: string;
  temp: string;
  icon: string;
  wind_deg: string;
  wind_speed: string;
};

type tempMinMaxStateType = {
  min_temp: string;
  max_temp: string;
};
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const hour = today.getHours();

function App() {
  const apiKey = process.env.REACT_APP_OW_API_KEY;

  const [cityName, setCityName] = useState("");
  const [currentCityName, setCurrentCityName] = useState("");
  const [currentLat, setCurrentLat] = useState<any>(33.2381);
  const [currentLng, setCurrentLng] = useState<any>(131.6125);
  const [currentResult, setCurrentResult] = useState<CurrentResultStateType>({
    timezone: "",
    feels_like: "",
    humidity: "",
    pressure: "",
    temp: "",
    icon: "",
    wind_deg: "",
    wind_speed: "",
  });
  const [dailiesIcon, setDailiesIcon] = useState<any>([]);
  const [dailiesMaxTemp, setDailiesMaxTemp] = useState<any>([]);
  const [dailiesMinTemp, setDailiesMinTemp] = useState<any>([]);
  const [hourlyTempArray, setHourlyTempArray] = useState<any>([]);
  const [tempMinMaxData, setTempMinMaxData] = useState<tempMinMaxStateType>({
    min_temp: "",
    max_temp: "",
  });

  // 入力した地名から緯度経度を取得する関数
  const getLatLng = async (e: any) => {
    e.preventDefault();
    const geoCodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    try {
      const response = await axios.get(geoCodingApiUrl);
      const { data } = response;

      const currentLatLng = {
        lat: data[0].lat,
        lng: data[0].lon,
      };
      setCurrentCityName(data[0].name);
      setCurrentLat(currentLatLng.lat);
      setCurrentLng(currentLatLng.lng);
    } catch (err) {
      console.log(err);
    }
  };

  // OneCallApiで天気情報を取得
  useEffect(() => {
    const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLng}&appid=${apiKey}&lang=ja&units=metric`;

    async function getWeatherDates() {
      try {
        const response = await axios.get(oneCallApiUrl);
        const { data } = response;

        // 現在の天気情報
        const currentWeatherData = {
          timezone: data.timezone,
          feels_like: data.current.feels_like,
          humidity: data.current.humidity,
          pressure: data.current.pressure,
          temp: data.current.temp,
          icon: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`,
          wind_deg: data.current.wind_deg,
          wind_speed: data.current.wind_speed,
        };
        setCurrentResult(currentWeatherData);

        // temp MIN MAXを取得
        const tempMinMaxData = {
          min_temp: data.daily[0].temp.min,
          max_temp: data.daily[0].temp.max,
        };
        setTempMinMaxData(tempMinMaxData);

        // hourlyTempを取得
        const hourlyTemp = [
          data.hourly[0].temp,
          data.hourly[1].temp,
          data.hourly[2].temp,
          data.hourly[3].temp,
          data.hourly[4].temp,
          data.hourly[5].temp,
          data.hourly[6].temp,
          data.hourly[7].temp,
        ];
        setHourlyTempArray(hourlyTemp);

        // dailiesWeatherDataを取得
        const dailiesArrayData = [data.daily];
        const dailiesArray = dailiesArrayData[0];

        const dailiesIconData = [
          dailiesArray[0].weather[0].icon,
          dailiesArray[1].weather[0].icon,
          dailiesArray[2].weather[0].icon,
          dailiesArray[3].weather[0].icon,
          dailiesArray[4].weather[0].icon,
          dailiesArray[5].weather[0].icon,
          dailiesArray[6].weather[0].icon,
        ];
        setDailiesIcon(dailiesIconData);

        const dailiesMaxTempData = [
          dailiesArray[0].temp.max,
          dailiesArray[1].temp.max,
          dailiesArray[2].temp.max,
          dailiesArray[3].temp.max,
          dailiesArray[4].temp.max,
          dailiesArray[5].temp.max,
          dailiesArray[6].temp.max,
        ];
        setDailiesMaxTemp(dailiesMaxTempData);

        const dailiesMinTempData = [
          dailiesArray[0].temp.min,
          dailiesArray[1].temp.min,
          dailiesArray[2].temp.min,
          dailiesArray[3].temp.min,
          dailiesArray[4].temp.min,
          dailiesArray[5].temp.min,
          dailiesArray[6].temp.min,
        ];
        setDailiesMinTemp(dailiesMinTempData);

        console.log(dailiesMinTemp);
      } catch (err) {
        console.log(err);
      }
    }
    getWeatherDates();
  }, [apiKey, currentLat, currentLng]);

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SearchArea
          cityName={cityName}
          getLatLng={getLatLng}
          handleSetCityName={handleSetCityName}
        />
        <div className={styles.middle_container}>
          <CurrentWeather
            currentResult={currentResult}
            date={date}
            month={month}
            tempMinMaxData={tempMinMaxData}
            currentCityName={currentCityName}
          />
          <GoogleMap currentLat={currentLat} currentLng={currentLng} />
        </div>
        <div className={styles.bottom_container}>
          <Recharts hour={hour} hourlyTempArray={hourlyTempArray} />
          <DailiesWeather
            month={month}
            date={date}
            dailiesMaxTemp={dailiesMaxTemp}
            dailiesMinTemp={dailiesMinTemp}
            dailiesIcon={dailiesIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
