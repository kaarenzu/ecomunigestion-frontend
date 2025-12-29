import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CrearReporte from "./pages/CrearReporte";
import CambiarEstado from "./pages/CambiarEstado";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crear-reporte" element={<CrearReporte />} />
      <Route path="/cambiar-estado" element={<CambiarEstado />} />
    </Routes>
  );
}

export default App;
