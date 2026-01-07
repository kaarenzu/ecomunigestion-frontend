import { useParams } from "react-router-dom";

function DetalleReporteCiudadano() {
    const { id } = useParams();

    const reportes =
        JSON.parse(localStorage.getItem("reportes")) || [];

    const reporte = reportes.find(
        (r, index) => index + 1 === Number(id)
    );

    if (!reporte) {
        return <p style={{ padding: "2rem" }}>Reporte no encontrado</p>;
    }

    return (
        <div className="page">
            <h1>Detalle del Reporte</h1>

            <div className="card">
                <p><strong>Título:</strong> {reporte.titulo}</p>
                <p><strong>Tipo:</strong> {reporte.tipo}</p>
                <p><strong>Sector:</strong> {reporte.sector}</p>
                <p><strong>Estado:</strong> {reporte.estado}</p>
                <p><strong>Fecha:</strong> {reporte.fecha}</p>

                {reporte.imagen && (
                    <p><strong>Imagen:</strong> {reporte.imagen}</p>
                )}
            </div>
        </div>
    );
}

export default DetalleReporteCiudadano;
