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
  // Sécurité : si les données ne sont pas encore chargées, on n'affiche rien
  if (!data) return null;

  /**
   * Tooltip personnalisé affiché au survol d'une barre
   * - active : true si la souris est sur une barre
   * - payload : contient les valeurs des Bar (poids + calories)
   */
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
      {/* ResponsiveContainer permet au graphique de s'adapter à la taille du parent */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barGap={8}
          margin={{ top: 80, right: 30, left: 30, bottom: 20 }}
        >
          {/* Grille horizontale uniquement (design SportSee) */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* Axe X : affichage des jours (1 à 7) */}
          <XAxis
            dataKey="day"
            // On utilise l'index pour afficher 1, 2, 3... au lieu de la date réelle
            tickFormatter={(index) => index + 1}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
          />

          {/* Axe Y pour le poids (kg), affiché à droite */}
          <YAxis
            yAxisId="kg"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
            // Domaine dynamique pour éviter que les barres touchent les bords
            domain={["dataMin - 1", "dataMax + 2"]}
          />

          {/* Axe Y pour les calories (caché, utilisé uniquement pour l'échelle) */}
          <YAxis
            yAxisId="cal"
            hide={true}
            domain={["dataMin - 100", "dataMax + 100"]}
          />

          {/* Tooltip personnalisé + curseur gris au survol */}
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

          {/* Barres du poids (kg) */}
          <Bar
            yAxisId="kg"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />

          {/* Barres des calories brûlées */}
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