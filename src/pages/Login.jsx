import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch {
            setError("Credenciales inválidas");
        }
    };

    return (
        <div className="page">


            <form className="form" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
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
                <button type="submit">Ingresar</button>
                {error && <p>{error}</p>}

                <p>
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </form>


        </div>
    );
}

export default Login;
