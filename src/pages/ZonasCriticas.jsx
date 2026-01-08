import { useEffect, useState } from "react";

function ZonasCriticas() {
    const [zonas, setZonas] = useState([]);

    useEffect(() => {
        const reportes =
            JSON.parse(localStorage.getItem("reportes")) || [];

        const agrupadas = {};

        reportes.forEach((r) => {
            if (r.estado !== "RESUELTO") {
                agrupadas[r.sector] = (agrupadas[r.sector] || 0) + 1;
            }
        });

        const resultado = Object.entries(agrupadas).map(
            ([sector, cantidad]) => {
                let nivel = "Baja";
                if (cantidad >= 5) nivel = "Alta";
                else if (cantidad >= 3) nivel = "Media";

                return { sector, cantidad, nivel };
            }
        );

        setZonas(resultado);
    }, []);

    return (
        <div className="page">
            <h1>Zonas Críticas</h1>
            <p>
                Análisis de sectores con mayor concentración de reportes
                activos
            </p>

            {/* KPIs */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <strong>Zonas críticas</strong>
                    <br />
                    {zonas.length}
                </div>

                <div className="kpi-card">
                    <strong>Reportes activos</strong>
                    <br />
                    {zonas.reduce((acc, z) => acc + z.cantidad, 0)}
                </div>

                <div className="kpi-card">
                    <strong>Sector más afectado</strong>
                    <br />
                    {zonas[0]?.sector || "-"}
                </div>
            </div>

            <div className="solicitudes-layout">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sector</th>
                            <th>Reportes</th>
                            <th>Criticidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zonas.map((zona) => (
                            <tr key={zona.sector}>
                                <td>{zona.sector}</td>
                                <td>{zona.cantidad}</td>
                                <td
                                    className={`criticidad-${zona.nivel.toLowerCase()}`}
                                >
                                    {zona.nivel}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="side-card">
                    <h3>Mapa de calor</h3>
                    <small>Distribución geográfica</small>

                    <div className="side-placeholder">
                        [ Mapa / Heatmap ]
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZonasCriticas;
