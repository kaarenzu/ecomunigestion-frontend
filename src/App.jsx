import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CrearReporte from "./pages/CrearReporte";
import Solicitudes from "./pages/Solicitudes";
import MisReportes from "./pages/MisReportes";
import "./App.css";
import DetalleReporteCiudadano from "./pages/DetalleReporteCiudadano";
import DetalleReporteFuncionario from "./pages/DetalleReporteFuncionario";
import ZonasCriticas from "./pages/ZonasCriticas";




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crear-reporte" element={<CrearReporte />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/mis-reportes" element={<MisReportes />} />
        <Route path="/detalle-reporte/:id" element={<DetalleReporteCiudadano />} />
        <Route path="/zonas-criticas" element={<ZonasCriticas />} />
        <Route
          path="/solicitudes/:id"
          element={<DetalleReporteFuncionario />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
