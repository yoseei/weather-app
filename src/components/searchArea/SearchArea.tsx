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
          <div className={styles.form_wrapper}>
            <div className={styles.input_wrapper}>
              <input
                value={cityName}
                onChange={handleSetCityName}
                type="text"
                placeholder="(例)東京都"
                className={styles.input}
                // style={{ width: "90%" }}
              />
            </div>
            <div className={styles.button_wrapper}>
              <button className={styles.button} onClick={getLatLng}>
                検索する
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
