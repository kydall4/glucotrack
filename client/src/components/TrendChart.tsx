import { Reading } from "../api/readings";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  readings: Reading[];
}

export default function TrendChart({ readings }: Props) {
  // Sort oldest → newest for chart
  const data = [...readings]
    .slice()
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .map((r) => ({
      time: new Date(r.timestamp).toLocaleTimeString(),
      glucose: r.glucoseLevel,
    }));

  return (
    <div>
      <h2>Glucose Trend</h2>
      {data.length === 0 ? (
          <div style={{ textAlign: "center", color: "#aaa", padding: "2rem" }}>
            <p>No readings yet.</p>
            <p>Add a glucose value to start tracking!</p>
          </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
           <Line type="monotone" dataKey="glucose" stroke="#6EC6FF" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
