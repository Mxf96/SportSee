import "../../styles/components/charts/PerformanceRadar.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceRadar({ data }) {
  if (!data) {
    console.warn("⚠️ Aucune donnée reçue :", data);
    return (
      <p className="performance-radar__message">Aucune donnée à afficher.</p>
    );
  }

  // Si c’est directement un tableau (cas mock)
  const rawData = Array.isArray(data) ? data : data.data || [];
  const kindSource = data.kind || {}; // utilisé si fourni par l’API

  // Traductions françaises
  const translations = {
    cardio: "Cardio",
    energy: "Énergie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  const correctOrder = [
    "energy",
    "cardio",
    "intensity",
    "speed",
    "strength",
    "endurance",
  ];

  // Formatage universel (API + mock)
  let formattedData = rawData.map((item) => {
    const key =
      typeof item.kind === "string"
        ? item.kind
        : kindSource[item.kind]?.toLowerCase();
    const label = translations[key] || "Inconnu";
    return { value: item.value, kind: label, key };
  });

  // ✅ Réordonne les données selon l’ordre voulu
  formattedData.sort(
    (a, b) => correctOrder.indexOf(a.key) - correctOrder.indexOf(b.key)
  );

  console.log("📊 Données formatées Radar :", formattedData);

  return (
    <div className="performance-radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="70%"
          data={formattedData}
          startAngle={210}
          endAngle={-150}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="kind" />
          <Radar dataKey="value" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}