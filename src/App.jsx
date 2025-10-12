import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StatCard from "./components/StatCard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<StatCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;