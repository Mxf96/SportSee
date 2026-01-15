import "../../styles/components/charts/PerformanceRadar.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceRadar({ data }) {
  // Sécurité : si aucune donnée n'est passée, on affiche un message (évite un crash)
  if (!data) {
    console.warn("⚠️ Aucune donnée reçue :", data);
    return (
      <p className="performance-radar__message">Aucune donnée à afficher.</p>
    );
  }

  /**
   * Gestion "API + mock" :
   * - Mock : data est souvent directement un tableau
   * - API : data est un objet { data: [...], kind: {...} }
   */
  const rawData = Array.isArray(data) ? data : data.data || [];

  // Dictionnaire "kind" fourni par l'API (ex: {1:"cardio", 2:"energy"...})
  const kindSource = data.kind || {};

  // Traductions FR pour coller à la maquette SportSee
  const translations = {
    cardio: "Cardio",
    energy: "Énergie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  /**
   * Ordre souhaité sur la maquette SportSee (le radar n'est pas dans l'ordre naturel de l'API)
   * => on réordonne manuellement après formatage
   */
  const correctOrder = [
    "energy",
    "cardio",
    "intensity",
    "speed",
    "strength",
    "endurance",
  ];

  /**
   * Formatage universel :
   * - Si item.kind est déjà un string (mock), on l'utilise directement
   * - Si item.kind est un nombre (API), on le convertit via kindSource
   * Puis on ajoute :
   * - kind : label affiché sur l'axe (FR)
   * - key : clé technique (EN) utile pour trier dans le bon ordre
   */
  let formattedData = rawData.map((item) => {
    const key =
      typeof item.kind === "string"
        ? item.kind
        : kindSource[item.kind]?.toLowerCase();
        
    const label = translations[key] || "Inconnu";

    return { value: item.value, kind: label, key };
  });

  // Réordonne les données selon l'ordre exact attendu par la maquette
  formattedData.sort(
    (a, b) => correctOrder.indexOf(a.key) - correctOrder.indexOf(b.key)
  );

  return (
    <div className="performance-radar">
      {/* ResponsiveContainer : radar adaptable à la taille du parent */}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="70%"
          data={formattedData}
          /**
           * startAngle/endAngle :
           * - Permet d'orienter le radar comme sur SportSee
           * - Sans ça, les axes ne tombent pas au bon endroit visuellement
           */
          startAngle={210}
          endAngle={-150}
        >
          {/* radialLines=false : supprime les lignes radiales pour coller à la maquette */}
          <PolarGrid radialLines={false} />

          {/* Affiche les labels (Cardio, Énergie, etc.) */}
          <PolarAngleAxis dataKey="kind" />

          {/* La surface du radar (valeurs) */}
          <Radar dataKey="value" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}