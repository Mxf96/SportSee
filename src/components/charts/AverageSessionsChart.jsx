import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const dayMap = ["", "L", "M", "M", "J", "V", "S", "D"];

export default function AverageSessionsChart({ data }) {
  const mapped = data.map((d) => ({ ...d, label: dayMap[d.day] }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={mapped}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          stroke="#fff"
        />
        <Tooltip
          labelFormatter={() => ""}
          formatter={(v) => [`${v} min`, "Temps"]}
          contentStyle={{ background: "#fff", border: "none", borderRadius: 6 }}
        />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="#fff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}