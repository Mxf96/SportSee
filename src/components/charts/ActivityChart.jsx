import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ActivityChart({ data }) {
  // data: [{ day, kilogram, calories }]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 32, right: 40, left: 20, bottom: 24 }} // marge interne du chart
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{ top: 8, right: 16 }} // <-- espace par rapport aux bords
        />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={12} // <-- espace entre ticks et bas du chart
        />
        <YAxis
          yAxisId="kg"
          dataKey="kilogram"
          orientation="right"
          axisLine={false}
          tickLine={false}
        />
        <YAxis yAxisId="cal" dataKey="calories" hide />

        <Tooltip
          formatter={(v, k) =>
            k === "kilogram" ? [`${v}kg`, "Poids"] : [`${v}kCal`, "Calories"]
          }
          contentStyle={{
            background: "#e60000",
            color: "#fff",
            borderRadius: 6,
          }}
        />

        <Bar
          yAxisId="kg"
          dataKey="kilogram"
          name="Poids (kg)"
          radius={[3, 3, 0, 0]}
          fill="#282d30"
          barSize={7}
        />
        <Bar
          yAxisId="cal"
          dataKey="calories"
          name="Calories brûlées (kCal)"
          radius={[3, 3, 0, 0]}
          fill="#E60000"
          barSize={7}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
