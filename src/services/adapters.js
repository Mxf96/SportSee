/**
 * Adapters / Normalisation des données :
 * Objectif : avoir toujours la même structure côté UI,
 * peu importe si la source est l'API ou des mocks.
 */

/**
 * Adaptation des infos utilisateur (endpoint /user/:id)
 * - On sécurise chaque champ avec ?? pour éviter undefined
 * - On harmonise le score : certaines sources utilisent "score", d'autres "todayScore"
 */
export function adaptUser(main) {
  // main peut être undefined (chargement / erreur), donc fallback sur {}
  const { id, userInfos, score, todayScore, keyData } = main || {};

  return {
    id,

    // On extrait le prénom/nom depuis userInfos
    firstName: userInfos?.firstName ?? "",
    lastName: userInfos?.lastName ?? "",

    // Score normalisé : on choisit score sinon todayScore, sinon 0
    score: score ?? todayScore ?? 0,

    // keyData contient les compteurs nutritionnels
    keyData: {
      calorieCount: keyData?.calorieCount ?? 0,
      proteinCount: keyData?.proteinCount ?? 0,
      carbohydrateCount: keyData?.carbohydrateCount ?? 0,
      lipidCount: keyData?.lipidCount ?? 0,
    },
  };
}

/**
 * Adaptation de l'activité quotidienne (endpoint /user/:id/activity)
 * - Recharts attend un tableau simple d'objets
 * - On renomme et on ne garde que ce qui sert au BarChart
 */
export const adaptActivity = (raw) =>
  raw?.sessions?.map((s) => ({
    day: s.day,
    kilogram: s.kilogram,
    calories: s.calories,
  })) ?? [];

/**
 * Adaptation des sessions moyennes (endpoint /user/:id/average-sessions)
 * - Format minimal pour le LineChart
 */
export const adaptAverageSessions = (raw) =>
  raw?.sessions?.map((s) => ({
    day: s.day,
    sessionLength: s.sessionLength,
  })) ?? [];

/**
 * Adaptation des performances (endpoint /user/:id/performance)
 * - L'API fournit souvent kind sous forme d'index (1..6)
 * - On convertit ces index en label lisible via raw.kind
 * - On garde une structure universelle : { kind: "cardio", value: 80 }
 */
export const adaptPerformance = (raw) => {
  const kind = raw?.kind || {};

  return (raw?.data || []).map((d) => ({
    // Si on trouve une correspondance dans kind => label, sinon fallback string
    kind: kind[d.kind] ?? String(d.kind),
    value: d.value,
  }));
};