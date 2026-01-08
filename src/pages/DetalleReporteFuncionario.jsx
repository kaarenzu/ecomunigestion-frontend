import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function DetalleReporteFuncionario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const reportes =
        JSON.parse(localStorage.getItem("reportes")) || [];

    const reporte = reportes.find((r) => r.id === Number(id));

    const [estado, setEstado] = useState(reporte?.estado || "");
    const [observacion, setObservacion] = useState(
        reporte?.observacion || ""
    );

    if (!reporte) {
        return <p style={{ padding: "2rem" }}>Reporte no encontrado</p>;
    }

    const guardarCambios = () => {
        const actualizados = reportes.map((r) => {
            if (r.id === reporte.id) {
                return {
                    ...r,
                    estado: estado,
                    observacion: observacion,
                };
            }
            return r;
        });

        localStorage.setItem(
            "reportes",
            JSON.stringify(actualizados)
        );

        navigate("/solicitudes");
    };



    return (
        <div className="page">
            <h1>Detalle del Reporte</h1>
            <p>Información completa del reporte ciudadano</p>

            <div className="detalle-grid">
                {/* COLUMNA IZQUIERDA */}
                <div>
                    <div className="detalle-doble">
                        <div className="detalle-card">
                            <h3>Información del reporte</h3>
                            <p><strong>Ciudadano:</strong> {reporte.ciudadanoEmail}</p>
                            <p><strong>Fecha:</strong> {reporte.fecha}</p>
                            <p><strong>Tipo:</strong> {reporte.tipo}</p>
                            <p><strong>Sector:</strong> {reporte.sector}</p>
                        </div>

                        <div className="detalle-card">
                            <h3>Prioridad automática</h3>
                            <p><strong>Alta</strong></p>
                            <p>Razón: zona con múltiples reportes</p>
                        </div>
                    </div>

                    <div className="detalle-card" style={{ marginTop: "1rem" }}>
                        <h3>Fotografía del reporte</h3>
                        <div className="placeholder">
                            {reporte.imagen || "Sin imagen"}
                        </div>
                    </div>

                    <div className="detalle-card" style={{ marginTop: "1rem" }}>
                        <h3>Mapa del reporte</h3>
                        <div className="placeholder mapa">
                            [ Mapa - Ubicación ]
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div>
                    <div className="detalle-card">
                        <h3>Estado</h3>

                        <select
                            className="estado-select"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="PENDIENTE">Recibido</option>
                            <option value="EN_PROCESO">En proceso</option>
                            <option value="RESUELTO">Resuelto</option>
                        </select>

                        <label style={{ marginTop: "1rem", display: "block" }}>
                            Observación
                        </label>
                        <textarea
                            value={observacion}
                            onChange={(e) => setObservacion(e.target.value)}
                            placeholder="Observaciones del funcionario"
                        />

                        <button
                            style={{ marginTop: "1rem" }}
                            onClick={guardarCambios}
                        >
                            Guardar cambios
                        </button>
                    </div>

                    <div className="detalle-card" style={{ marginTop: "1rem" }}>
                        <h3>Historial del reporte</h3>

                        <table className="historial-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Cambiado por</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{reporte.fecha}</td>
                                    <td>{reporte.estado}</td>
                                    <td>Funcionario</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DetalleReporteFuncionario;
