import React from "react";
import "../styles/components/Sidebar.scss";
import group from "../assets/img/icons/Group.png";
import group3 from "../assets/img/icons/Group 3.png";
import vector from "../assets/img/icons/Vector.png";
import vector1 from "../assets/img/icons/Vector (1).png";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Barre latérale">
      <nav className="sidebar__icons" aria-label="Raccourcis activités">
        <button className="sidebar__btn" aria-label="Yoga">
          <img src={group} alt="Yoga" />
        </button>
        <button className="sidebar__btn" aria-label="Natation">
          <img src={group3} alt="Natation" />
        </button>
        <button className="sidebar__btn" aria-label="Cyclisme">
          <img src={vector} alt="Cyclisme" />
        </button>
        <button className="sidebar__btn" aria-label="Musculation">
          <img src={vector1} alt="Musculation" />
        </button>
      </nav>

      <small className="sidebar__copyright">Copyright, SportSee 2020</small>
    </aside>
  );
}

export default Sidebar;