import { useEffect, useState } from "react";
import api from "../services/api";

function ZonasCriticas() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchZonasCriticas = async () => {
            try {
                const response = await api.get("/dashboard/kpis");
                setData(response.data);
            } catch (err) {
                console.error(err);
                setError("No fue posible cargar las zonas críticas");
            } finally {
                setLoading(false);
            }
        };

        fetchZonasCriticas();
    }, []);

    if (loading) {
        return (
            <div className="page">
                <h1>Zonas Críticas</h1>
                <p>Cargando información...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <h1>Zonas Críticas</h1>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>Zonas Críticas</h1>
            <p>
                Análisis de sectores con mayor concentración de reportes
                prioritarios
            </p>

            {/* KPIs */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <strong>Zona crítica actual</strong>
                    <br />
                    {data.zona_critica}
                </div>

                <div className="kpi-card">
                    <strong>Reportes urgentes</strong>
                    <br />
                    {data.urgentes}
                </div>

                <div className="kpi-card">
                    <strong>Tiempo promedio de resolución</strong>
                    <br />
                    {data.tiempo_promedio_horas} hrs
                </div>
            </div>

            <div className="detalle-card" style={{ marginTop: "2rem" }}>
                <h3>Análisis</h3>
                <p>
                    El sistema identifica como zona crítica el sector{" "}
                    <strong>{data.zona_critica}</strong>, debido a la alta
                    concentración de reportes urgentes registrados.
                </p>
                <p>
                    Este análisis permite priorizar recursos municipales y
                    optimizar la gestión operativa.
                </p>
            </div>
        </div>
    );
}

export default ZonasCriticas;
