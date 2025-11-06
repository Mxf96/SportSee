import { api } from "./api";
import mockData from "./mockData.json";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

/**
 * 🔧 Fonction utilitaire pour comparer même si l'id est une string
 */
const matchId = (itemId, userId) => String(itemId) === String(userId);

/**
 * Données principales (user)
 */
export async function getUserMain(userId) {
  if (useMock) {
    console.log("Mode mock activé (user)");
    return mockData.users.find((u) => matchId(u.id, userId)) || null;
  }

  try {
    const response = await api.get(`/user/${userId}`);
    return response.data.data;
  } catch {
    console.warn("⚠️ API indisponible, utilisation des données mockées (user)");
    return mockData.users.find((u) => matchId(u.id, userId)) || null;
  }
}

/**
 * Activité quotidienne
 */
export async function getUserActivity(userId) {
  if (useMock) {
    console.log("Mode mock activé (activity)");
    const mock = mockData.activity.find(
      (a) => String(a.userId) === String(userId)
    );
    const sessions =
      mock?.sessions.map((s) => ({
        ...s,
        day: new Date(s.day).getDate(),
      })) || [];

    return sessions;
  }

  try {
    const response = await api.get(`/user/${userId}/activity`);
    const sessions = response.data.data.sessions.map((s) => ({
      ...s,
      day: new Date(s.day).getDate(),
    }));
    return sessions;
  } catch {
    console.warn(
      "⚠️ API indisponible, utilisation des données mockées (activity)"
    );
    const mock = mockData.activity.find(
      (a) => String(a.userId) === String(userId)
    );
    const sessions =
      mock?.sessions.map((s) => ({
        ...s,
        day: new Date(s.day).getDate(),
      })) || [];
    return sessions;
  }
}

/**
 * Moyenne des sessions
 */
export async function getUserAverageSessions(userId) {
  if (useMock) {
    console.log("Mode mock activé (averageSessions)");
    const mock = mockData.averageSessions.find((a) =>
      matchId(a.userId, userId)
    );
    return mock?.sessions || [];
  }

  try {
    const response = await api.get(`/user/${userId}/average-sessions`);
    return response.data.data.sessions || [];
  } catch {
    console.warn(
      "⚠️ API indisponible, utilisation des données mockées (averageSessions)"
    );
    const mock = mockData.averageSessions.find((a) =>
      matchId(a.userId, userId)
    );
    return mock?.sessions || [];
  }
}

/**
 * Performances
 */
export async function getUserPerformance(userId) {
  if (useMock) {
    console.log("Mode mock activé (performance)");
    const mock = mockData.performance.find(
      (a) => String(a.userId) === String(userId)
    );

    if (!mock) return [];

    // Transforme les données au format attendu par Recharts :
    const { kind, data } = mock;
    return data.map((d) => ({
      kind: kind[d.kind],
      value: d.value,
    }));
  }

  try {
    const response = await api.get(`/user/${userId}/performance`);
    const { kind, data } = response.data.data;
    return data.map((d) => ({
      kind: kind[d.kind],
      value: d.value,
    }));
  } catch {
    console.warn(
      "⚠️ API indisponible, utilisation des données mockées (performance)"
    );
    const mock = mockData.performance.find(
      (a) => String(a.userId) === String(userId)
    );

    if (!mock) return [];

    const { kind, data } = mock;
    return data.map((d) => ({
      kind: kind[d.kind],
      value: d.value,
    }));
  }
}