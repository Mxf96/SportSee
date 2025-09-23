import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Sidebar />

      <Routes>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
