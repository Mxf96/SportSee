import React from "react";
import "../styles/components/StatCard.scss";
import energy from "../assets/img/icons/energy.png";
import chicken from "../assets/img/icons/chicken.png";
import apple from "../assets/img/icons/apple.png";
import cheeseburger from "../assets/img/icons/cheeseburger.png";

const ICONS = {
  calories: energy,
  proteins: chicken,
  carbs: apple,
  fat: cheeseburger,
};

const Icon = ({ tone, title }) => (
  <span
    className={`statcard__icon statcard__icon--${tone}`}
    aria-label={title}
    role="img"
  >
    <img src={ICONS[tone]} alt="" />
  </span>
);

export default function StatCard({ tone = "calories", title, value }) {
  return (
    <div className="statcard">
      <Icon tone={tone} title={title} />
      <div className="statcard__content">
        {value ? <div className="statcard__value">{value}</div> : null}
        <div className="statcard__title">{title}</div>
      </div>
    </div>
  );
}