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
  // Mapping des jours (API : 1..7) → affichage (L..D)
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  // Référence vers le conteneur pour récupérer sa largeur (effet "overlay" au survol)
  const containerRef = useRef(null);

  // Largeur de l'overlay sombre à droite du curseur (effet visuel SportSee)
  const [overlayWidth, setOverlayWidth] = useState(0);

  /**
   * Tooltip personnalisé :
   * - Affiche la durée en minutes au survol
   * - Calcule en même temps la largeur de l'overlay (zone sombre à droite)
   */
  const CustomTooltip = ({ active, payload, coordinate }) => {
    // active + payload + coordinate => on est bien en hover sur un point
    if (active && payload && payload.length && coordinate) {
      // Largeur réelle du conteneur (ResponsiveContainer rend la largeur dynamique)
      const containerWidth = containerRef.current?.clientWidth ?? 0;

      // coordinate.x = position X du curseur dans le graphique
      // On veut la largeur restante à droite pour assombrir cette zone
      const w = Math.max(containerWidth - coordinate.x, 1);

      // Met à jour l'overlay en temps réel pendant le survol
      setOverlayWidth(w);

      return (
        <div className="average-sessions__tooltip">
          {`${payload[0].value} min`}
        </div>
      );
    }

    // Quand on quitte le graphique, on réinitialise l'overlay
    if (overlayWidth !== 0) setOverlayWidth(0);
    return null;
  };

  return (
    // Le ref sert à mesurer la largeur du bloc pour calculer l'overlay
    <div className="average-sessions" ref={containerRef}>
      <h3 className="average-sessions__title">Durée moyenne des sessions</h3>

      {/* Overlay visuel : bande sombre qui suit le curseur (maquette SportSee) */}
      <div
        className="average-sessions__overlay"
        style={{ width: `${overlayWidth}px` }}
      />

      {/* ResponsiveContainer : le chart s'adapte au parent */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          // Marges pour laisser respirer le titre / les ticks
          margin={{ top: 60, right: 10, left: 10, bottom: 10 }}
        >
          {/* Axe X : transforme day (1..7) en lettre (L..D) */}
          <XAxis
            dataKey="day"
            tickFormatter={(dayIndex) => days[dayIndex - 1]}
            tick={{ fill: "white", opacity: 0.6 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Axe Y masqué : on garde l'échelle mais on n'affiche pas les graduations */}
          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

          {/* Tooltip custom + pas de curseur par défaut (on gère notre overlay) */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            wrapperStyle={{ outline: "none" }}
          />

          {/* Courbe : pas de points (dot=false), mais un activeDot visible au survol */}
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