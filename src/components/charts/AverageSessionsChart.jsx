import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

export default function AverageSessionsChart({ data }) {
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "white",
            color: "black",
            padding: "4px 8px",
            borderRadius: "5px",
            fontSize: "12px",
            transform: "translateY(-50%)",
          }}
        >
          {`${payload[0].value} min`}
        </div>
      );
    }
    return null;
  };

  const CustomCursor = (props) => {
    const { points, height } = props;
    const x = points?.[0]?.x ?? 0;
    const chartWidth = props.width ?? props?.viewBox?.width ?? 300; // fallback
    const cursorWidth = x >= chartWidth - 1 ? 15 : chartWidth - x;

    return (
      <Rectangle
        fill="rgba(0, 0, 0, 0.15)"
        x={x}
        y={0}
        width={cursorWidth}
        height={height}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 70 }}
      >
        <XAxis
          dataKey="day"
          tickFormatter={(dayIndex) => days[dayIndex - 1]}
          tick={{ fill: "white", opacity: 0.6 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={<CustomCursor />}
          wrapperStyle={{ outline: "none" }} // évite le carré noir
        />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="#fff"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            stroke: "#fff",
            strokeWidth: 2,
            fill: "#fff",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
