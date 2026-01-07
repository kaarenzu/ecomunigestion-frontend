import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

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
            // Aquí podrías guardar el rol en tu base de datos si es necesario
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const uid = userCredential.user.uid;

            // 👇 guardar rol asociado al usuario
            localStorage.setItem(`role_${uid}`, role);

            // 🔒 cerrar sesión para forzar login explícito
            await signOut(auth);
            // redirigir (Login decidirá el destino final)
            navigate("/login");

        } catch {
            setError("Error al registrar usuario");
        }
    };

    return (
        <div className="page">
            <h2>Registro</h2>

            <form className="form" onSubmit={handleSubmit}>
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
