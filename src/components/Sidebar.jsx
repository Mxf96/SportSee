import React from "react";
import "../styles/components/Sidebar.scss";
import group from "../assets/img/icons/Group.png";
import group3 from "../assets/img/icons/Group 3.png";
import vector from "../assets/img/icons/Vector.png";
import vector1 from "../assets/img/icons/Vector (1).png";

function Sidebar() {
  return (
    // Aside : contenu complémentaire à la navigation principale
    <aside className="sidebar" aria-label="Barre latérale">
      {/* Navigation verticale des raccourcis d'activités */}
      <nav className="sidebar__icons" aria-label="Raccourcis activités">
        {/* Boutons d'activités (icônes uniquement, action non implémentée) */}
        <button className="sidebar__btn" aria-label="Yoga">
          {/* Icône Yoga */}
          <img src={group} alt="Yoga" />
        </button>

        <button className="sidebar__btn" aria-label="Natation">
          {/* Icône Natation */}
          <img src={group3} alt="Natation" />
        </button>

        <button className="sidebar__btn" aria-label="Cyclisme">
          {/* Icône Cyclisme */}
          <img src={vector} alt="Cyclisme" />
        </button>

        <button className="sidebar__btn" aria-label="Musculation">
          {/* Icône Musculation */}
          <img src={vector1} alt="Musculation" />
        </button>
      </nav>

      {/* Mention légale positionnée verticalement (maquette SportSee) */}
      <div className="sidebar__copyright">
        <span>Copyright, SportSee 2020</span>
      </div>
    </aside>
  );
}

export default Sidebar;
