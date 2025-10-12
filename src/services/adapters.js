export function adaptUser(main) {
  const { id, userInfos, score, todayScore, keyData } = main || {};
  return {
    id,
    firstName: userInfos?.firstName ?? "",
    lastName: userInfos?.lastName ?? "",
    score: score ?? todayScore ?? 0,
    keyData: {
      calorieCount: keyData?.calorieCount ?? 0,
      proteinCount: keyData?.proteinCount ?? 0,
      carbohydrateCount: keyData?.carbohydrateCount ?? 0,
      lipidCount: keyData?.lipidCount ?? 0,
    },
  };
}

export const adaptActivity = (raw) =>
  raw?.sessions?.map((s) => ({
    day: s.day,
    kilogram: s.kilogram,
    calories: s.calories,
  })) ?? [];

export const adaptAverageSessions = (raw) =>
  raw?.sessions?.map((s) => ({ day: s.day, sessionLength: s.sessionLength })) ??
  [];

export const adaptPerformance = (raw) => {
  const kind = raw?.kind || {};
  return (raw?.data || []).map((d) => ({
    kind: kind[d.kind] ?? String(d.kind),
    value: d.value,
  }));
};