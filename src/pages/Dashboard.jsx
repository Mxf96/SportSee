import React, { useEffect, useState } from "react";
import "../styles/pages/Dashboard.scss";
import StatCard from "../components/StatCard";
import ActivityChart from "../components/charts/ActivityChart";
import AverageSessionsChart from "../components/charts/AverageSessionsChart";
import PerformanceRadar from "../components/charts/PerformanceRadar";
import ScoreGauge from "../components/charts/ScoreGauge";

import {
  getUserMain,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from "../services/userService";

export default function Dashboard() {
  // ID utilisateur (fixé ici pour le projet / mock). Peut venir d'une route ensuite.
  const userId = 12;

  // Données principales + data pour chaque graphique
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [avgSessions, setAvgSessions] = useState([]);
  const [performance, setPerformance] = useState([]);

  // États UI (chargement + gestion d'erreur)
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    /**
     * Chargement des données au montage :
     * - Promise.all permet de lancer les requêtes en parallèle (plus rapide)
     * - Si une seule requête échoue, on passe en état d'erreur
     */
    (async () => {
      try {
        const [u, act, avg, perf] = await Promise.all([
          getUserMain(userId),
          getUserActivity(userId),
          getUserAverageSessions(userId),
          getUserPerformance(userId),
        ]);

        // Mise à jour des states avec les données récupérées
        setUser(u);
        setActivity(act);
        setAvgSessions(avg);
        setPerformance(perf);
      } catch (e) {
        // Log dev + message utilisateur
        console.error(e);
        setErr("Impossible de charger les données.");
      } finally {
        // Dans tous les cas, on sort de l'état "loading"
        setLoading(false);
      }
    })();
  }, [userId]);

  /**
   * Gestion des états de rendu :
   * - loading : affiche un état de chargement
   * - err / user absent : affiche un message d'erreur / fallback
   */
  if (loading)
    return (
      <main className="dashboard main-with-sidebar">
        <p>Chargement…</p>
      </main>
    );
  if (err || !user)
    return (
      <main className="dashboard main-with-sidebar">
        <p>{err || "Aucune donnée."}</p>
      </main>
    );

  return (
    <main className="dashboard main-with-sidebar">
      {/* Intro : prénom + message de motivation */}
      <header className="dashboard__intro">
        <h1>
          Bonjour <span className="accent">{user?.userInfos?.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </header>

      {/* Layout principal : zone graphiques + zone stats (cards à droite) */}
      <section className="dashboard__grid">
        <div className="dashboard__left">
          {/* Card XL : activité quotidienne (bar chart) */}
          <div className="card card--xl">
            {/* Header de la card : titre + légende (Poids / Calories) */}
            <div className="card__header">
              <h2 className="card__title">Activité quotidienne</h2>

              <div className="activity-legend">
                <span className="activity-legend__item activity-legend__item--kg">
                  Poids (kg)
                </span>
                <span className="activity-legend__item activity-legend__item--cal">
                  Calories brûlées (kCal)
                </span>
              </div>
            </div>

            {/* Graphique barres : poids + calories */}
            <ActivityChart data={activity} />
          </div>

          {/* 3 mini cards : sessions moyennes / radar / score */}
          <div className="dashboard__mini">
            <AverageSessionsChart data={avgSessions} />

            <PerformanceRadar data={performance} />

            {/* Score : selon la source, l'API peut fournir todayScore ou score */}
            <ScoreGauge score={user.score} todayScore={user.todayScore} />
          </div>
        </div>

        {/* Colonne droite : stats clés (cards réutilisables) */}
        <aside className="dashboard__right">
          <StatCard
            tone="calories"
            title="Calories"
            value={`${user.keyData.calorieCount.toLocaleString()}kCal`}
          />
          <StatCard
            tone="proteins"
            title="Proteines"
            value={`${user.keyData.proteinCount}g`}
          />
          <StatCard
            tone="carbs"
            title="Glucides"
            value={`${user.keyData.carbohydrateCount}g`}
          />
          <StatCard
            tone="fat"
            title="Lipides"
            value={`${user.keyData.lipidCount}g`}
          />
        </aside>
      </section>
    </main>
  );
}