import styles from "./Recharts.module.scss";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PropsType = {
  hour: number;
  hourlyTempArray: any;
};

const Recharts = ({ hour, hourlyTempArray }: PropsType) => {
  const data = [
    { name: `${hour}時`, temp: hourlyTempArray[0] },
    { name: `${hour + 1}時`, temp: hourlyTempArray[1] },
    { name: `${hour + 2}時`, temp: hourlyTempArray[2] },
    { name: `${hour + 3}時`, temp: hourlyTempArray[3] },
    { name: `${hour + 4}時`, temp: hourlyTempArray[4] },
    { name: `${hour + 5}時`, temp: hourlyTempArray[5] },
    { name: `${hour + 6}時`, temp: hourlyTempArray[6] },
    { name: `${hour + 7}時`, temp: hourlyTempArray[7] },
  ];

  return (
    <div className={styles.root}>
      <h3>１時間ごとの予測</h3>
      <div className={styles.charts_wrapper}>
        <div className={styles.letter_temp}>
          <div>温</div>
          <div>気</div>
        </div>
        <div className={styles.charts_container}>
          <p>temperature</p>
          <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <p>時刻</p>
        </div>
      </div>
    </div>
  );
};

export default Recharts;
