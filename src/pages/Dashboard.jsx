import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !role) return;

        if (role === "CIUDADANO") {
            navigate("/crear-reporte");
        }

        if (role === "FUNCIONARIO") {
            navigate("/solicitudes");
        }
    }, [user, role, navigate]);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard</h1>
            <p>Cargando panel según rol...</p>
        </div>
    );
}

export default Dashboard;
