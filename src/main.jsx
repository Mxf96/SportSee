import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss";

// Point d'entrée de l'application React (React 18)
createRoot(document.getElementById("root")).render(
  // StrictMode : aide au développement
  // - détecte les effets secondaires
  // - déclenche certains cycles deux fois en dev (normal)
  // - n'affecte PAS le comportement en production
  <StrictMode>
    <App />
  </StrictMode>
);