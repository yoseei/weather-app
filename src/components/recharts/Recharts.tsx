import styles from "./Recharts.module.scss";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
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
          <ResponsiveContainer width="95%" height={300}>
            {/* width={500} height={300} */}
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval="preserveStartEnd" />
              <YAxis interval="preserveStartEnd" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          <p>時刻</p>
        </div>
      </div>
    </div>
  );
};

export default Recharts;
