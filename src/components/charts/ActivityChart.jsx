import "../../styles/components/charts/ActivityChart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

export default function ActivityChart({ data }) {
  if (!data) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length === 2) {
      const kg = payload[0].value;
      const kcal = payload[1].value;
      return (
        <div className="activity-chart__tooltip">
          <p>{`${kg}kg`}</p>
          <p>{`${kcal}Kcal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="activity-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barGap={8}
          margin={{ top: 80, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={(value, index) => index + 1}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
            domain={["dataMin - 1", "dataMax + 2"]}
          />
          <YAxis
            yAxisId="cal"
            hide={true}
            domain={["dataMin - 100", "dataMax + 100"]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={
              <Rectangle
                fill="#C4C4C480"
                opacity={0.5}
                radius={[10, 10, 0, 0]}
              />
            }
          />
          <Bar
            yAxisId="kg"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="cal"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
