import { useEffect, useState } from "react";

function Solicitudes() {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("reportes")) || [];
        setReportes(data);
    }, []);

    const cambiarEstado = (id, nuevoEstado) => {
        const actualizados = reportes.map((reporte) =>
            reporte.id === id
                ? { ...reporte, estado: nuevoEstado }
                : reporte
        );

        setReportes(actualizados);
        localStorage.setItem("reportes", JSON.stringify(actualizados));
    };

    if (reportes.length === 0) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Solicitudes</h1>
                <p>No hay reportes registrados.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Solicitudes</h1>

            {reportes.map((reporte) => (
                <div
                    key={reporte.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    <h3>{reporte.titulo}</h3>

                    <p><strong>Tipo:</strong> {reporte.tipo}</p>
                    <p><strong>Sector:</strong> {reporte.sector}</p>
                    <p><strong>Ciudadano:</strong> {reporte.ciudadanoEmail}</p>
                    <p><strong>Fecha:</strong> {reporte.fecha}</p>

                    <p>
                        <strong>Estado actual:</strong> {reporte.estado}
                    </p>

                    <select
                        value={reporte.estado}
                        onChange={(e) =>
                            cambiarEstado(reporte.id, e.target.value)
                        }
                    >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="EN_PROCESO">En proceso</option>
                        <option value="RESUELTO">Resuelto</option>
                    </select>
                </div>
            ))}
        </div>
    );
}

export default Solicitudes;
