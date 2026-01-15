import axios from "axios";

/**
 * Instance Axios centralisée :
 * - Évite de répéter l'URL de base et les headers partout
 * - Facilite la maintenance (changement d'API, ajout d'interceptors, etc.)
 */
export const api = axios.create({
  /**
   * URL de base de l'API :
   * - Utilise la variable d'environnement VITE_API_URL si définie
   * - Fallback sur localhost pour le développement
   */
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",

  // En-têtes par défaut pour toutes les requêtes
  headers: { "Content-Type": "application/json" },

  /**
   * Timeout global (en ms) :
   * - Évite les requêtes bloquées trop longtemps
   * - Permet de gérer proprement les erreurs réseau
   */
  timeout: 10000,
});