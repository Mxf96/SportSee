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
  const userId = 12;
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [avgSessions, setAvgSessions] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [u, act, avg, perf] = await Promise.all([
          getUserMain(userId),
          getUserActivity(userId),
          getUserAverageSessions(userId),
          getUserPerformance(userId),
        ]);
        setUser(u);
        setActivity(act);
        setAvgSessions(avg);
        setPerformance(perf);
      } catch (e) {
        console.error(e);
        setErr("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

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
      <header className="dashboard__intro">
        <h1>
          Bonjour <span className="accent">{user?.userInfos?.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </header>

      <section className="dashboard__grid">
        <div className="dashboard__left">
          <div className="card card--xl">
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

            <ActivityChart data={activity} />
          </div>

          <div className="dashboard__mini">
            <AverageSessionsChart data={avgSessions} />

            <PerformanceRadar data={performance} />

            <ScoreGauge score={user.score} todayScore={user.todayScore} />
          </div>
        </div>

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
