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
};

const Recharts = ({ hour }: PropsType) => {
  const data = [
    { name: `${hour}時`, temp: 0, pv: 2400, amt: 2400 },
    { name: `${hour + 1}時`, temp: 4, pv: 2500, amt: 2600 },
    { name: `${hour + 2}時`, temp: 6, pv: 2600, amt: 2700 },
    { name: `${hour + 3}時`, temp: 12, pv: 2700, amt: 2800 },
    { name: `${hour + 4}時`, temp: 15, pv: 2800, amt: 2900 },
    { name: `${hour + 5}時`, temp: 17, pv: 2800, amt: 2900 },
    { name: `${hour + 6}時`, temp: 18, pv: 2800, amt: 2900 },
    { name: `${hour + 7}時`, temp: 40, pv: 2800, amt: 2900 },
  ];

  return (
    <div className={styles.root}>
      <h3>１時間ごとの予測</h3>
      <div className={styles.charts_wrapper}>
        <p className={styles.temperature}>気温</p>
        <div className={styles.charts_container}>
          <p>temperature</p>
          <LineChart width={600} height={300} data={data}>
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
