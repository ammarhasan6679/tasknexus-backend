import { useState } from "react";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "email",
                email
            );

            window.location.href = "/";

        } catch (error) {

            console.error(error);

            alert("Invalid credentials");
        }
    };

    return (

        <div
            style={{
                padding: "50px"
            }}
        >

            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)}
                style={{
                    display: "block",
                    marginBottom: "10px"
                }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)}
                style={{
                    display: "block",
                    marginBottom: "10px"
                }}
            />

            <button onClick={login}>
                Login
            </button>

        </div>
    );
}

export default Login;