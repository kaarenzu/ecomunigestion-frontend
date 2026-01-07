import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MisReportes() {
    const { user } = useAuth();
    const [misReportes, setMisReportes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // 🛡️ Defensa: si no hay usuario, no hacer nada
        if (!user) {
            setMisReportes([]);
            return;
        }


        const reportes =
            JSON.parse(localStorage.getItem("reportes")) || [];

        const filtrados = reportes.filter(
            (r) => r.ciudadanoEmail === user.email
        );

        setMisReportes(filtrados);
    }, [user]);

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
                        <tr key={reporte.id}>
                            <td>{index + 1}</td>
                            <td>{reporte.fecha}</td>
                            <td>{reporte.tipo}</td>
                            <td>
                                <span className={`status ${reporte.estado}`}>
                                    {reporte.estado.replace("_", " ")}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn-detalle"
                                    onClick={() =>
                                        navigate(`/detalle-reporte/${index + 1}`)
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
