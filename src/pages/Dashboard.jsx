import React from "react";
import "../styles/pages/Dashboard.scss";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <main className="dashboard main-with-sidebar">
      {/* En-tête texte */}
      <header className="dashboard__intro">
        <h1>
          Bonjour <span className="accent">Thomas</span>
        </h1>
        <p>
          Félicitation ! Vous avez explosé vos objectifs hier <span>👏</span>
        </p>
      </header>

      {/* Grille principale */}
      <section className="dashboard__grid">
        {/* Colonne gauche */}
        <div className="dashboard__left">
          <div className="card card--xl">
            <div className="card__title">Activité quotidienne</div>
            {/* Placeholder chart */}
            <div className="placeholder placeholder--bars" />
          </div>

          <div className="dashboard__mini">
            <div className="card card--mini">
              <div className="card__title">Durée moyenne des sessions</div>
              <div className="placeholder placeholder--line" />
            </div>
            <div className="card card--mini card--dark">
              <div className="card__title">Intensité</div>
              <div className="placeholder placeholder--radar" />
            </div>
            <div className="card card--mini">
              <div className="card__title">Score</div>
              <div className="placeholder placeholder--gauge">
                <div className="gauge__ring" />
                <div className="gauge__center">
                  <strong>12%</strong>
                  <span>
                    de votre
                    <br />
                    objectif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : cartes de stats */}
        <aside className="dashboard__right">
          <StatCard
            tone="calories"
            title="Calories"
            value="1,930kCal"
            iconLabel="flame"
          />
          <StatCard
            tone="proteins"
            title="Proteines"
            value="155g"
            iconLabel="drumstick"
          />
          <StatCard
            tone="carbs"
            title="Glucides"
            value="290g"
            iconLabel="apple"
          />
          <StatCard tone="fat" title="Lipides" value="50g" iconLabel="burger" />
        </aside>
      </section>
    </main>
  );
}