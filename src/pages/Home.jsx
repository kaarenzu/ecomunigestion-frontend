import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

function Home() {

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>EcoMuniGestión Smart</h1>

            <p style={{ maxWidth: "600px", margin: "1rem auto" }}>
                Plataforma digital para la gestión de reportes ciudadanos y apoyo a la
                toma de decisiones municipales.
            </p>

            <div style={{ marginTop: "2rem" }}>
                <Link to="/login">
                    <button>Iniciar sesión</button>
                </Link>

                <Link to="/register" style={{ marginLeft: "1rem" }}>
                    <button>Registrarse</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
