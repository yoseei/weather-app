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
  const [initialLat, setInitialLat] = useState<number>();
  const [initialLng, setInitialLng] = useState<number>();
  const [currentLat, setCurrentLat] = useState<number>(0); //33.246974
  const [currentLng, setCurrentLng] = useState<number>(0); //131.653347
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
  const [dailiesMaxTemp, setDailiesMaxTemp] = useState<number[]>([]);
  const [dailiesMinTemp, setDailiesMinTemp] = useState<number[]>([]);
  const [hourlyTempArray, setHourlyTempArray] = useState<number[]>([]);
  const [tempMinMaxData, setTempMinMaxData] = useState<tempMinMaxStateType>({
    min_temp: "",
    max_temp: "",
  });

  useEffect(() => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // 成功した時の関数
          async function successFunc(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            setInitialLat(lat);
            setInitialLng(lng);
          },
          // 失敗した時の関数
          function errorFunc(error) {
            // エラーコードのメッセージを定義
            const errorMessage: any = {
              0: "原因不明のエラーが発生しました…。",
              1: "位置情報の取得が許可されませんでした…。",
              2: "電波状況などで位置情報が取得できませんでした…。",
              3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
            };

            // エラーコードに合わせたエラー内容をアラート表示
            alert(errorMessage[error.code]);
          },
          // option
          {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 2000,
          }
        );
      } else {
        const errorMessage =
          "お使いの端末は、GeoLocation APIに対応していません。";
        alert(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 入力した地名から緯度経度を取得する関数
  const getLatLng: any = async (e: any) => {
    e.preventDefault();
    const geoCodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    try {
      const response = await axios.get(geoCodingApiUrl);
      const { data } = response;
      console.log(data[0].lat);
      const currentLatLng = {
        lat: data[0].lat,
        lng: data[0].lon,
      };
      setCurrentCityName(data[0].local_names.ja);
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
          icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`,
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
      } catch (err) {
        console.log(err);
      }
    }
    getWeatherDates();
  }, [initialLat, initialLng, currentLat, currentLng]);

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
          <div className={styles.current_weather_wrapper}>
            <CurrentWeather
              currentResult={currentResult}
              date={date}
              month={month}
              tempMinMaxData={tempMinMaxData}
              currentCityName={currentCityName}
            />
          </div>
          <div className={styles.google_map_wrapper}>
            <GoogleMap
              currentLat={currentLat}
              currentLng={currentLng}
              initialLat={initialLat}
              initialLng={initialLng}
            />
          </div>
        </div>
        <div className={styles.bottom_container}>
          <div className={styles.recharts_wrapper}>
            <Recharts hour={hour} hourlyTempArray={hourlyTempArray} />
          </div>
          <div className={styles.dailies_weather_wrapper}>
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
    </div>
  );
}

export default App;
