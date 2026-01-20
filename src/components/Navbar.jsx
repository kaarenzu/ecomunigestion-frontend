import { NavLink, useNavigate } from "react-router-dom";
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
                <NavLink className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                } to="/">EcoMuniGestionSmart</NavLink>
            </div>

            <div className="navbar-right">
                {!user && <NavLink className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                } to="/login">Iniciar sesión</NavLink>}
                {user && role === "CIUDADANO" && (
                    <>
                        <NavLink className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        } to="/crear-reporte">Reportar</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        } to="/mis-reportes">Mis Reportes</NavLink>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                )}

                {user && role === "FUNCIONARIO" && (
                    <>
                        <NavLink className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        } to="/solicitudes">Solicitudes</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        } to="/zonas-criticas">Zonas Críticas</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        } to="/dashboard">Dashboard</NavLink>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                )}
            </div>
        </nav>
    );

}

export default Navbar;
