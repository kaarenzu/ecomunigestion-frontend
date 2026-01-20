import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function DetalleReporteCiudadano() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetalle = async () => {
            try {
                const response = await api.get(`/reportes/${id}`);
                setReporte(response.data);
            } catch (err) {
                console.error(err);
                setError("No fue posible cargar el detalle del reporte");
            } finally {
                setLoading(false);
            }
        };

        fetchDetalle();
    }, [id]);

    if (loading) {
        return (
            <div className="page">
                <h1>Detalle del Reporte</h1>
                <p>Cargando información...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <h1>Detalle del Reporte</h1>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    if (!reporte) return null;

    return (
        <div className="page">
            <h1>Detalle del Reporte</h1>

            <p><strong>Título:</strong> {reporte.titulo}</p>
            <p><strong>Descripción:</strong> {reporte.descripcion}</p>
            <p><strong>Sector:</strong> {reporte.sector}</p>
            <p><strong>Tipo de problema:</strong> {reporte.tipo_problema}</p>
            <p><strong>Estado:</strong> {reporte.estado}</p>
            <p>
                <strong>Fecha:</strong>{" "}
                {new Date(reporte.fecha_creacion).toLocaleDateString("es-CL")}
            </p>

            <h3>Observaciones</h3>

            {reporte.observaciones && reporte.observaciones.length > 0 ? (
                <ul>
                    {reporte.observaciones.map((obs, index) => (
                        <li key={index}>
                            {obs.observacion} (
                            {new Date(obs.fecha_observacion).toLocaleDateString("es-CL")})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No existen observaciones para este reporte.</p>
            )}

            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
}

export default DetalleReporteCiudadano;
