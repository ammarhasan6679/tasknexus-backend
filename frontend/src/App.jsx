import { BrowserRouter, Routes, Route } from "react-router-dom";

import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import MemberDashboard from "./pages/MemberDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

    const role =
        localStorage.getItem("role");

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/"
                    element={<Projects role={role} />}
                />

                <Route
                    path="/projects"
                    element={<Projects role={role} />}
                />

                <Route
                    path="/projects/:id"
                    element={<ProjectDetails role={role} />}
                />

                <Route
                    path="/member"
                    element={<MemberDashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;