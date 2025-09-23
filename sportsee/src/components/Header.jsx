import React from "react";
import "../styles/components/Header.scss";
import logo from "../assets/img/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SportSee Logo" />
      </div>
      <nav className="header__nav">
        <ul>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglage</li>
          <li>Communauté</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;