import { useState } from "react";
import styles from "./SearchArea.module.scss";

type PropsType = {
  cityName: string;
  handleSetCityName: React.ChangeEventHandler<HTMLInputElement>;
  getData: (e: any) => void;
};
const SearchArea = ({ cityName, handleSetCityName, getData }: PropsType) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>都市名</h3>
          <input
            value={cityName}
            onChange={handleSetCityName}
            type="text"
            placeholder="(例)東京"
          />
          <button onClick={getData}>検索する</button>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
