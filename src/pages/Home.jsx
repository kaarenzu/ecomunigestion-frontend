import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="page-full">

            {/* HERO */}
            <section className="hero">
                <div className="hero-content">

                    {/* COLUMNA IZQUIERDA */}
                    <div className="hero-text">
                        <h1>EcoMuniGestión Smart</h1>
                        <p className="hero-subtitle">
                            Plataforma digital para la gestión eficiente de reportes ciudadanos
                            sobre limpieza y aseo municipal.
                        </p>
                        <p className="hero-description">
                            Reporta problemáticas ambientales de forma simple y permite al municipio
                            gestionar, priorizar y dar seguimiento a cada caso con trazabilidad y
                            datos útiles.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn primary">Reportar problema</button>
                            <button className="btn secondary">Ingresar al sistema</button>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="hero-image"></div>

                </div>
            </section>


            {/* COMO FUNCIONA */}
            <section className="section">
                <h2>¿Cómo funciona EcoMuniGestión Smart?</h2>

                <div className="steps">
                    <div className="step-card">
                        <h3>1. Reporta</h3>
                        <p>
                            El ciudadano registra un reporte indicando el tipo de problema,
                            sector y una breve descripción.
                        </p>
                    </div>

                    <div className="step-card">
                        <h3>2. Gestión Municipal</h3>
                        <p>
                            El municipio recibe el reporte, lo clasifica, asigna prioridad y
                            actualiza su estado.
                        </p>
                    </div>

                    <div className="step-card">
                        <h3>3. Seguimiento</h3>
                        <p>
                            El ciudadano puede revisar el estado de su solicitud y las
                            observaciones asociadas.
                        </p>
                    </div>
                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="section light">
                <h2>Beneficios del sistema</h2>

                <ul className="benefits">
                    <li>✔ Canal único y formal de reportes ciudadanos</li>
                    <li>✔ Trazabilidad completa del proceso</li>
                    <li>✔ Reducción de tiempos de respuesta</li>
                    <li>✔ Información centralizada para el municipio</li>
                    <li>✔ Mejora en la participación ciudadana</li>
                </ul>
            </section>

            {/* PERFILES */}
            <section className="section">
                <h2>Acceso según perfil</h2>

                <div className="profiles">
                    <div className="profile-card">
                        <h3>Ciudadano</h3>
                        <p>
                            Reporta problemas ambientales y realiza seguimiento del estado de
                            tus solicitudes.
                        </p>
                        <button
                            className="btn primary"
                            onClick={() => navigate("/login")}
                        >
                            Crear reporte
                        </button>
                    </div>

                    <div className="profile-card">
                        <h3>Funcionario Municipal</h3>
                        <p>
                            Gestiona reportes, actualiza estados y visualiza métricas de apoyo
                            a la gestión.
                        </p>
                        <button
                            className="btn secondary"
                            onClick={() => navigate("/login")}
                        >
                            Acceder
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <p>
                    EcoMuniGestión Smart – Proyecto de Título <br />
                    IPLACEX – Analista Programador | 2026
                </p>
            </footer>

        </div>
    );
};

export default Home;
