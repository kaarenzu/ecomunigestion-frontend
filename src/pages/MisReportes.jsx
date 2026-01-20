import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MisReportes() {
    const { user } = useAuth();
    const [misReportes, setMisReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // 🛡️ Defensa: si no hay usuario, no hacer nada
        if (!user?.email) {
            setMisReportes([]);
            setLoading(false);
            return;
        }

        const fetchMisReportes = async () => {
            try {
                const response = await api.get(
                    `/reportes/usuario/${user.email}`
                );
                setMisReportes(response.data);
            } catch (err) {
                console.error(err);
                setError("No fue posible cargar tus reportes");
            } finally {
                setLoading(false);
            }
        };

        fetchMisReportes();
    }, [user]);

    if (loading) {
        return (
            <div className="page">
                <h1>Mis Reportes</h1>
                <p>Cargando reportes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <h1>Mis Reportes</h1>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    if (misReportes.length === 0) {
        return (
            <div className="page">
                <h1>Mis Reportes</h1>
                <p>No has creado reportes aún.</p>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>Mis Reportes</h1>
            <p>Historial de tus reportes enviados al municipio</p>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Ver detalle</th>
                    </tr>
                </thead>

                <tbody>
                    {misReportes.map((reporte, index) => (
                        <tr key={reporte.id_reporte}>
                            <td>{index + 1}</td>
                            <td> {new Date(reporte.fecha_creacion).toLocaleDateString("es-CL")}</td>
                            <td>{reporte.tipo_problema}</td>
                            <td>
                                <span className={`status ${reporte.estado}`}>
                                    {reporte.estado}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn-detalle"
                                    onClick={() =>
                                        navigate(`/detalle-reporte/${reporte.id_reporte}`)
                                    }
                                >
                                    Ver detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MisReportes;
