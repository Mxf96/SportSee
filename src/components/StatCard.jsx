import React from "react";
import "../styles/components/StatCard.scss";
import energy from "../assets/img/icons/energy.png";
import chicken from "../assets/img/icons/chicken.png";
import apple from "../assets/img/icons/apple.png";
import cheeseburger from "../assets/img/icons/cheeseburger.png";

/**
 * Mapping entre le "tone" et l'icône associée
 * Permet d'avoir un composant générique et réutilisable
 */
const ICONS = {
  calories: energy,
  proteins: chicken,
  carbs: apple,
  fat: cheeseburger,
};

/**
 * Composant icône :
 * - Séparé pour clarifier la structure de StatCard
 * - role="img" + aria-label pour l'accessibilité
 */
const Icon = ({ tone, title }) => (
  <span
    className={`statcard__icon statcard__icon--${tone}`}
    aria-label={title}
    role="img"
  >
    {/* L'image est décorative, l'information est portée par aria-label */}
    <img src={ICONS[tone]} alt="" />
  </span>
);

export default function StatCard({ tone = "calories", title, value }) {
  return (
    <div className="statcard">
      {/* Icône visuelle correspondant au type de statistique */}
      <Icon tone={tone} title={title} />
      
      <div className="statcard__content">
        {/* Valeur principale (ex: 1930kCal, 155g, etc.) */}
        {value ? <div className="statcard__value">{value}</div> : null}

        {/* Libellé de la statistique */}
        <div className="statcard__title">{title}</div>
      </div>
    </div>
  );
}