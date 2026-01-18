import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    // BrowserRouter : permet la gestion du routing côté client
    <BrowserRouter>
      {/* Header affiché sur toutes les pages */}
      <Header />

      {/* Sidebar affichée sur toutes les pages */}
      <Sidebar />

      {/* Définition des routes de l'application */}
      <Routes>
        {/* Route principale : tableau de bord utilisateur */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;