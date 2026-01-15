import { api } from "./api";
import mockData from "./mockData.json";

// Flag d'environnement : permet de forcer le mode mock sans toucher au code
const useMock = import.meta.env.VITE_USE_MOCK === "true";

/**
 * 🔧 Fonction utilitaire :
 * Compare les IDs même si l'un est number et l'autre string
 * (évite les bugs quand l'API / les mocks n'ont pas le même type)
 */
const matchId = (itemId, userId) => String(itemId) === String(userId);

/* -------------------------------------------------------------------------- */
/*                                 USER MAIN                                  */
/* -------------------------------------------------------------------------- */

/**
 * Données principales (user)
 * - Mode mock : lecture dans mockData.users
 * - Mode API : GET /user/:id
 * - Fallback : si l'API plante, on bascule sur les mocks
 */
export async function getUserMain(userId) {
  // ✅ Mode mock forcé via .env
  if (useMock) {
    console.log("Mode mock activé (user)");
    return mockData.users.find((u) => matchId(u.id, userId)) || null;
  }

  try {
    // ✅ Appel API
    const response = await api.get(`/user/${userId}`);
    // SportSee API : les vraies données sont dans response.data.data
    return response.data.data;
  } catch {
    // ✅ Fallback automatique si API indisponible
    console.warn("⚠️ API indisponible, utilisation des données mockées (user)");
    return mockData.users.find((u) => matchId(u.id, userId)) || null;
  }
}

/* -------------------------------------------------------------------------- */
/*                               USER ACTIVITY                                */
/* -------------------------------------------------------------------------- */

/**
 * Activité quotidienne
 * - API : GET /user/:id/activity
 * - Le champ "day" est une date (YYYY-MM-DD) -> on la transforme en numéro de jour
 *   pour afficher 1..7 sur l'axe X (comme la maquette)
 */
export async function getUserActivity(userId) {
  // ✅ Mode mock forcé
  if (useMock) {
    console.log("Mode mock activé (activity)");

    const mock = mockData.activity.find(
      (a) => String(a.userId) === String(userId)
    );

    // ✅ Transformation day -> numéro du jour (1..31)
    const sessions =
      mock?.sessions.map((s) => ({
        ...s,
        day: new Date(s.day).getDate(),
      })) || [];

    return sessions;
  }

  try {
    // ✅ Appel API
    const response = await api.get(`/user/${userId}/activity`);

    // ✅ Même transformation que pour les mocks
    const sessions = response.data.data.sessions.map((s) => ({
      ...s,
      day: new Date(s.day).getDate(),
    }));

    return sessions;
  } catch {
    // ✅ Fallback automatique si API indisponible
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

/* -------------------------------------------------------------------------- */
/*                           USER AVERAGE SESSIONS                             */
/* -------------------------------------------------------------------------- */

/**
 * Moyenne des sessions
 * - API : GET /user/:id/average-sessions
 * - Ici, on renvoie directement les sessions (format déjà exploitable par le LineChart)
 */
export async function getUserAverageSessions(userId) {
  // ✅ Mode mock forcé
  if (useMock) {
    console.log("Mode mock activé (averageSessions)");
    const mock = mockData.averageSessions.find((a) =>
      matchId(a.userId, userId)
    );
    return mock?.sessions || [];
  }

  try {
    // ✅ Appel API
    const response = await api.get(`/user/${userId}/average-sessions`);
    return response.data.data.sessions || [];
  } catch {
    // ✅ Fallback automatique si API indisponible
    console.warn(
      "⚠️ API indisponible, utilisation des données mockées (averageSessions)"
    );
    const mock = mockData.averageSessions.find((a) =>
      matchId(a.userId, userId)
    );
    return mock?.sessions || [];
  }
}

/* -------------------------------------------------------------------------- */
/*                               USER PERFORMANCE                              */
/* -------------------------------------------------------------------------- */

/**
 * Performances
 * - API : GET /user/:id/performance
 * - L'API fournit un dictionnaire "kind" (index -> label)
 * - On transforme pour avoir un tableau simple { kind: "cardio", value: 80 }
 *   directement utilisable par le RadarChart
 */
export async function getUserPerformance(userId) {
  // ✅ Mode mock forcé
  if (useMock) {
    console.log("Mode mock activé (performance)");

    const mock = mockData.performance.find(
      (a) => String(a.userId) === String(userId)
    );
    if (!mock) return [];

    // ✅ Transformation au format attendu par Recharts
    const { kind, data } = mock;
    return data.map((d) => ({
      kind: kind[d.kind],
      value: d.value,
    }));
  }

  try {
    // ✅ Appel API
    const response = await api.get(`/user/${userId}/performance`);
    const { kind, data } = response.data.data;

    // ✅ Même format que les mocks
    return data.map((d) => ({
      kind: kind[d.kind],
      value: d.value,
    }));
  } catch {
    // ✅ Fallback automatique si API indisponible
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