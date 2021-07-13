import { useState } from "react";
import styles from "./SearchArea.module.scss";

type PropsType = {
  cityName: string;
  handleSetCityName: any;
  getLatLng: (e: any) => void;
};
const SearchArea = ({ cityName, handleSetCityName, getLatLng }: PropsType) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3>都市名</h3>
        <form className={styles.form}>
          <input
            value={cityName}
            onChange={handleSetCityName}
            type="text"
            placeholder="(例)東京"
          />
          <button onClick={getLatLng}>検索する</button>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
