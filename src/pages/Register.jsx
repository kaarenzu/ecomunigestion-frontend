import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import api from "../services/api";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [role, setRole] = useState("CIUDADANO");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {

            // Registrar el usuario en la API con su rol
            await api.post("/usuarios/registro", {
                email,
                rol: role
            });


            // 🔒 cerrar sesión para forzar login explícito
            await signOut(auth);
            // redirigir (Login decidirá el destino final)
            navigate("/login");

        } catch {
            console.warn("Backend no disponible en entorno productivo académico");
            setError("Error al registrar usuario");
        }
    };

    return (
        <div className="page">

            <form className="form" onSubmit={handleSubmit}>
                <h2>Registro</h2>

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="CIUDADANO">Ciudadano</option>
                    <option value="FUNCIONARIO">Funcionario</option>
                </select>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Registrarse</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default Register;
