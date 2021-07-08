import React from "react";
import styles from "./App.module.scss";
import CurrentWeather from "./components/currentWeather/Currentweather";
import SearchArea from "./components/searchArea/SearchArea";
function App() {
  return (
    <div className={styles.root}>
      <SearchArea />
      <CurrentWeather />
    </div>
  );
}

export default App;
