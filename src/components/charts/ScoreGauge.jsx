import "../../styles/components/charts/ScoreGauge.scss";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function ScoreGauge({ score, todayScore }) {
  const finalScore = todayScore ?? score ?? 0;
  const value = Math.round(finalScore * 100);

  const data = [{ name: "score", full: 100, value }];

  return (
    <div className="score">
      <h3 className="score__title">Score</h3>
      
      <ResponsiveContainer className="score__chart" width="100%" height="100%">
        <RadialBarChart
          data={data}
          startAngle={90}
          endAngle={450}
          innerRadius="60%"
          outerRadius="50%"
          barSize={12}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          <RadialBar dataKey="value" fill="#E60000" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="score__center">
        <strong>{value}%</strong>
        <span>
          de votre
          <br />
          objectif
        </span>
      </div>
    </div>
  );
}