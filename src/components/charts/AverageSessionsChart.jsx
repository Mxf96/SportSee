import { useRef, useState } from "react";
import "../../styles/components/charts/AverageSessionsChart.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AverageSessionsChart({ data }) {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const containerRef = useRef(null);
  const [overlayWidth, setOverlayWidth] = useState(0);

  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length && coordinate) {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const w = Math.max(containerWidth - coordinate.x, 1);
      setOverlayWidth(w);

      return (
        <div className="average-sessions__tooltip">
          {`${payload[0].value} min`}
        </div>
      );
    }

    if (overlayWidth !== 0) setOverlayWidth(0);
    return null;
  };

  return (
    <div className="average-sessions" ref={containerRef}>
      <h3 className="average-sessions__title">Durée moyenne des sessions</h3>

      <div
        className="average-sessions__overlay"
        style={{ width: `${overlayWidth}px` }}
      />

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 60, right: 10, left: 10, bottom: 10 }}
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
            cursor={false}
            wrapperStyle={{ outline: "none" }}
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
    </div>
  );
}