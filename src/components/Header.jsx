import React from "react";
import "../styles/components/Header.scss";
import logo from "../assets/img/logo.png";

function Header() {
  return (
    <header className="header">
      {/* Logo principal de l'application */}
      <div className="header__logo">
        {/* L'image est importée pour être correctement gérée par le bundler */}
        <img src={logo} alt="SportSee Logo" />
      </div>

      {/* Navigation principale (header fixe sur toute l'application) */}
      <nav className="header__nav">
        <ul>
          {/* Liens statiques (maquette SportSee) */}
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