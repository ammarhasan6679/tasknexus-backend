import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("MEMBER");

    const signup = async () => {

        try {

            await api.post("/auth/signup", {

                name,
                email,
                password,
                role
            });

            alert("Signup successful");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert("Signup failed");
        }
    };

    return (

        <div
            style={{
                padding: "50px"
            }}
        >

            <h1>Signup</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)}
                style={{
                    display: "block",
                    marginBottom: "10px"
                }}
            />

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

            <select
                value={role}
                onChange={(e) =>
                    setRole(e.target.value)}
                style={{
                    display: "block",
                    marginBottom: "10px"
                }}
            >

                <option value="ADMIN">
                    ADMIN
                </option>

                <option value="MEMBER">
                    MEMBER
                </option>

            </select>

            <button onClick={signup}>
                Signup
            </button>

        </div>
    );
}

export default Signup;