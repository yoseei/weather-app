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
  hourlyArray: any;
};

const Recharts = ({ hour, hourlyArray }: PropsType) => {
  console.log(hourlyArray[0]);
  const data = [
    { name: `${hour}時`, temp: 0 },
    // { name: `${hour + 1}時`, temp: hourlyArray[1].temp },
    // { name: `${hour + 2}時`, temp: hourlyArray[2].temp },
    // { name: `${hour + 3}時`, temp: hourlyArray[3].temp },
    // { name: `${hour + 4}時`, temp: hourlyArray[4].temp },
    // { name: `${hour + 5}時`, temp: hourlyArray[5].temp },
    // { name: `${hour + 6}時`, temp: hourlyArray[6].temp },
    // { name: `${hour + 7}時`, temp: hourlyArray[7].temp },
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
