import "../../styles/components/charts/ScoreGauge.scss";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function ScoreGauge({ score, todayScore }) {
  /**
   * Selon la source (API / mock), le score peut être :
   * - todayScore (souvent API)
   * - score (souvent mock)
   * On prend celui qui existe, sinon 0.
   */
  const finalScore = todayScore ?? score ?? 0;

  // L'API renvoie un score entre 0 et 1 → on le convertit en pourcentage
  const value = Math.round(finalScore * 100);

  /**
   * Recharts attend un tableau d'objets pour les données.
   * Ici, on a une seule "barre" radiale correspondant au score.
   */
  const data = [{ name: "score", full: 100, value }];

  return (
    <div className="score">
      <h3 className="score__title">Score</h3>

      {/* Le graphique est responsive et prend la taille du parent */}
      <ResponsiveContainer className="score__chart" width="100%" height="100%">
        <RadialBarChart
          /**
           * startAngle/endAngle :
           * - On fait un cercle complet (360°) en partant du haut
           * - 90 → point de départ en haut
           * - 450 = 90 + 360 pour boucler le cercle
           */
          data={data}
          startAngle={90}
          endAngle={450}
          /**
           * innerRadius/outerRadius :
           * - Définit l'épaisseur de l'anneau
           * ⚠️ Attention : sur RadialBarChart, "inner" peut être plus grand que "outer"
           * car Recharts calcule l'anneau selon son propre repère interne.
           */
          innerRadius="60%"
          outerRadius="50%"
          barSize={12}
        >
          {/* Axe angulaire caché : on garde l'échelle 0-100 sans afficher de ticks */}
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          {/* La barre rouge représente le % du score */}
          <RadialBar
            dataKey="value"
            fill="#E60000"
            cornerRadius={10} // arrondit les extrémités pour un rendu plus "smooth"
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Texte centré au-dessus du chart (div séparée pour un layout fidèle à la maquette) */}
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