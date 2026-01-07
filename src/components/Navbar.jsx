import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Navbar() {
    const { user, role, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    if (loading) {
        return (
            <nav>
                <span>EcoGestionMuni</span>
            </nav>
        );
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">EcoMuniSmart</Link>
            </div>

            <div className="navbar-right">
                {!user && <Link to="/login">Iniciar sesión</Link>}

                {user && role === "CIUDADANO" && (
                    <>
                        <Link to="/crear-reporte">Reportar</Link>
                        <Link to="/mis-reportes">Mis Reportes</Link>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                )}

                {user && role === "FUNCIONARIO" && (
                    <>
                        <Link to="/solicitudes">Solicitudes</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                )}
            </div>
        </nav>
    );

}

export default Navbar;
