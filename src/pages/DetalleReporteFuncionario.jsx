import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";


const estadoToId = {
    PENDIENTE: 1,
    REVISION: 2,
    EN_PROCESO: 3,
    RESUELTO: 4
};


function DetalleReporteFuncionario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const emailFuncionario = user?.email;


    const [reporte, setReporte] = useState(null);
    const [estado, setEstado] = useState("");
    const [observacion, setObservacion] = useState("");
    const [historial, setHistorial] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDetalle = async () => {
            try {
                const response = await api.get(`/reportes/${id}`);
                setReporte(response.data);
                const normalizarEstado = (estadoTexto) => {
                    if (!estadoTexto) return "";

                    return estadoTexto
                        .toUpperCase()
                        .replace(" ", "_");
                };

                setEstado(normalizarEstado(response.data.estado));


            } catch (err) {
                console.error(err);
                setError("No fue posible cargar el detalle del reporte");
            } finally {
                setLoading(false);
            }
        };

        fetchDetalle();
    }, [id]);

    const guardarCambios = async () => {
        try {
            // PT-07: cambio de estado
            console.log("Guardando estado:", estado);
            console.log("Funcionario:", emailFuncionario);
            console.log("id reporte:", id);
            await api.put(`/reportes/${id}/estado`, {
                id_estado: estadoToId[estado],
                email_funcionario: emailFuncionario,
            });


            // PT-08: agregar observación
            if (observacion.trim() !== "") {
                await api.post(`/reportes/${id}/observaciones`, {
                    observacion: observacion,
                    email_funcionario: emailFuncionario,
                });
            }

            navigate("/solicitudes");
        } catch (err) {
            console.error(err);
            alert("Error al guardar los cambios");
        }
    };

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
            <p>Información completa del reporte ciudadano</p>

            <div className="detalle-grid">
                {/* COLUMNA IZQUIERDA */}
                <div>
                    <div className="detalle-doble">
                        <div className="detalle-card">
                            <h3>Información del reporte</h3>
                            <p><strong>Ciudadano:</strong> {reporte.ciudadanoEmail}</p>
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {new Date(reporte.fecha_creacion).toLocaleDateString("es-CL")}
                            </p>
                            <p><strong>Tipo:</strong> {reporte.tipo_problema}</p>
                            <p><strong>Sector:</strong> {reporte.sector}</p>
                        </div>

                        <div className="detalle-card">
                            <h3>Prioridad automática</h3>
                            <p><strong>{reporte.prioridad}</strong></p>
                            <p>Calculada automáticamente por el sistema</p>
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
                            <option value="EN_REVISION">En revisión</option>
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

                </div>
            </div>
        </div>
    );
}

export default DetalleReporteFuncionario;
