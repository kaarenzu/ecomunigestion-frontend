import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

/* =========================
   Mapas de equivalencia
   (alineados con la BD)
========================= */
const TIPO_MAP = {
    "Microbasural": 1,
    "Escombros": 2,
    "Contenedores": 3,
};

const SECTOR_MAP = {
    "Centro": 1,
    "Norte": 2,
    "Sur": 3,
};

function CrearReporte() {
    const { user } = useAuth();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    /* =========================
       Envío al backend (PT-02)
    ========================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        try {
            const payload = {
                titulo: `${titulo}`,
                email: user.email,
                nombre: user.email.split("@")[0],
                descripcion: `${descripcion}`,
                id_tipo_problema: TIPO_MAP[tipo],
                id_sector: SECTOR_MAP[direccion],
                prioridad: "ALTA",
            };

            await api.post("/reportes/crear", payload);

            setMensaje("Reporte enviado correctamente");

            // Limpiar formulario
            setTitulo("");
            setDescripcion("");
            setTipo("");
            setDireccion("");
            setImagen(null);

        } catch (err) {
            console.error(err);
            setError("Ocurrió un error al enviar el reporte");
        }
    };

    return (
        <div className="page">
            <h1>Crear Reporte</h1>

            <form className="form" onSubmit={handleSubmit}>
                {/* Título */}
                <input
                    type="text"
                    placeholder="Título del reporte"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                {/* Descripción */}
                <textarea
                    placeholder="Descripción del problema"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />

                {/* Imagen (solo interfaz por ahora) */}
                <label>Fotografía del reporte</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                />

                {/* Tipo de problema */}
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                >
                    <option value="">Seleccione tipo de problema</option>
                    <option value="Microbasural">Microbasural</option>
                    <option value="Escombros">Escombros</option>
                    <option value="Contenedores">Contenedores</option>
                </select>

                {/* Sector */}
                <select
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                >
                    <option value="">Seleccione sector</option>
                    <option value="Centro">Centro</option>
                    <option value="Norte">Norte</option>
                    <option value="Sur">Sur</option>
                </select>

                <button type="submit">Enviar Reporte</button>
            </form>

            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default CrearReporte;
