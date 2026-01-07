import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function CrearReporte() {
    const { user } = useAuth();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [mensaje, setMensaje] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoReporte = {
            id: Date.now(),
            titulo,
            descripcion,
            imagen: imagen ? imagen.name : null,
            tipo,
            sector: direccion,
            estado: "PENDIENTE",
            fecha: new Date().toLocaleDateString(),
            ciudadanoEmail: user.email,
        };

        // 🔹 Guardar en localStorage (simulación DB)
        const reportesGuardados =
            JSON.parse(localStorage.getItem("reportes")) || [];

        localStorage.setItem(
            "reportes",
            JSON.stringify([...reportesGuardados, nuevoReporte])
        );

        setMensaje("Reporte enviado correctamente");

        setTitulo("");
        setDescripcion("");
        setTipo("");
        setDireccion("");
    };

    return (
        <div className="page">
            <h1>Crear Reporte</h1>

            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título del reporte"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Descripción del problema"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />

                <label>Fotografía del reporte</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                />


                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                >
                    <option value="">Seleccione tipo de problema</option>
                    <option value="Basura">Basura</option>
                    <option value="Iluminación">Iluminación</option>
                    <option value="Baches">Baches</option>
                    <option value="Áreas verdes">Áreas verdes</option>
                    <option value="Otro">Otro</option>
                </select>

                <select
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                >
                    <option value="">Seleccione sector</option>
                    <option value="Centro">Centro</option>
                    <option value="Norte">Norte</option>
                    <option value="Sur">Sur</option>
                    <option value="Oriente">Oriente</option>
                    <option value="Poniente">Poniente</option>
                </select>

                <button type="submit">Enviar Reporte</button>
            </form>

            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        </div>
    );
}

export default CrearReporte;
