import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const calcularPrioridad = (estado) => {
    if (estado === "PENDIENTE") return "ALTA";
    if (estado === "EN_PROCESO") return "MEDIA";
    return "BAJA";
};

function Solicitudes() {
    const [reportes, setReportes] = useState([]);
    const navigate = useNavigate();
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroPrioridad, setFiltroPrioridad] = useState("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("reportes")) || [];
        setReportes(data);
    }, []);

    const activosPorSector = {};

    reportes.forEach((r) => {
        if (r.estado !== "RESUELTO") {
            activosPorSector[r.sector] =
                (activosPorSector[r.sector] || 0) + 1;
        }
    });

    const estados = [...new Set(reportes.map(r => r.estado))];
    const tipos = [...new Set(reportes.map(r => r.tipo))];
    const prioridades = ["ALTA", "MEDIA", "BAJA"];


    const reportesFiltrados = reportes.filter((r) => {
        const prioridad = calcularPrioridad(r.estado);

        return (
            (filtroEstado === "" || r.estado === filtroEstado) &&
            (filtroTipo === "" || r.tipo === filtroTipo) &&
            (filtroPrioridad === "" || prioridad === filtroPrioridad)
        );
    });


    const sectorCritico = Object.entries(activosPorSector)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

    const urgentes = reportes.filter(
        (r) => r.estado === "PENDIENTE"
    ).length;

    // Datos para gráfico lateral
    const reportesActivos = reportes.filter(
        (r) => r.estado !== "RESUELTO"
    );

    const porSector = {};

    reportesActivos.forEach((r) => {
        porSector[r.sector] = (porSector[r.sector] || 0) + 1;
    });

    const datosGrafico = Object.entries(porSector);


    return (
        <div className="page">
            <h1>Gestión de Solicitudes</h1>
            <p>Panel de control de funcionario municipal</p>

            {/* KPIs */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <strong>Urgentes:</strong> {urgentes}
                    <br />
                    <small>Emergencias</small>
                </div>

                <div className="kpi-card">
                    <strong>Zonas críticas</strong>
                    <br />
                    <small>{sectorCritico || "Sin zona crítica"}</small>
                </div>

                <div className="kpi-card">
                    <strong>Tiempo promedio</strong>
                    <br />
                    <small>48 horas</small>
                </div>
            </div>

            {/* Filtros (solo UI) */}
            <div className="filters">
                <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                >
                    <option value="">Tipo de problema</option>
                    {tipos.map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>

                <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="">Estado</option>
                    {estados.map((estado) => (
                        <option key={estado} value={estado}>
                            {estado.replace("_", " ")}
                        </option>
                    ))}
                </select>
                <select
                    value={filtroPrioridad}
                    onChange={(e) => setFiltroPrioridad(e.target.value)}
                >
                    <option value="">Prioridad</option>
                    {prioridades.map((prioridad) => (
                        <option key={prioridad} value={prioridad}>
                            {prioridad}

                        </option>
                    ))}
                </select>

                <button
                    onClick={() => {
                        setFiltroEstado("");
                        setFiltroTipo("");
                        setFiltroPrioridad("");
                    }}
                >
                    Limpiar
                </button>

            </div>


            {/* Tabla + lateral */}
            <div className="solicitudes-layout">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Sector</th>
                            <th>Prioridad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportesFiltrados.map((reporte, index) => (
                            <tr key={reporte.id}>
                                <td>{index + 1}</td>
                                <td>{reporte.tipo}</td>
                                <td>{reporte.fecha}</td>
                                <td>{reporte.sector}</td>
                                <td>{calcularPrioridad(reporte.estado)}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            navigate(`/solicitudes/${reporte.id}`)

                                        }
                                    >
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="side-card">
                    <h3>Reportes por sector</h3>
                    <small>(últimos 7 días)</small>

                    <div className="side-placeholder" style={{ flexDirection: "column" }}>
                        {datosGrafico.length === 0 && (
                            <p>No hay reportes activos</p>
                        )}

                        {datosGrafico.map(([sector, cantidad]) => (
                            <div
                                key={sector}
                                style={{
                                    width: "100%",
                                    marginBottom: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                <small>{sector}</small>
                                <div
                                    style={{
                                        background: "#cde5cd",
                                        height: "10px",
                                        width: `${cantidad * 20}px`,
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Solicitudes;
