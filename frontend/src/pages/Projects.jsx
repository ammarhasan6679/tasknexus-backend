import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Projects({ role }) {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetchProjects();

    }, []);

    const fetchProjects = async () => {

        try {

            const response =
                await api.get("/projects");

            setProjects(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const createProject = async () => {

        try {

            await api.post("/projects", {

                projectName,
                description,

                startDate: "2026-05-01",

                endDate: "2026-06-01",

                createdBy: {
                    id: 1
                }
            });

            fetchProjects();

            setProjectName("");
            setDescription("");

        } catch (error) {

            console.error(error);
        }
    };

    const deleteProject = async (projectId) => {

        try {

            await api.delete(
                `/projects/${projectId}`
            );

            fetchProjects();

        } catch (error) {

            console.error(error);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (

        <div style={{ padding: "20px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >

                {
                    !token ? (

                        <>

                            <button
                                onClick={() =>
                                    navigate("/login")}
                            >
                                Login
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/signup")}
                            >
                                Signup
                            </button>

                        </>

                    ) : (

                        <button onClick={logout}>
                            Logout
                        </button>
                    )
                }

            </div>

            <h1>Projects</h1>

            {
                role === "ADMIN" && token && (

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>Create Project</h2>

                        <input
                            type="text"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) =>
                                setProjectName(
                                    e.target.value
                                )}
                            style={{
                                display: "block",
                                marginBottom: "10px"
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )}
                            style={{
                                display: "block",
                                marginBottom: "10px"
                            }}
                        />

                        <button onClick={createProject}>
                            Create Project
                        </button>

                    </div>
                )
            }

            {
                projects.map(project => (

                    <div
                        key={project.id}
                        onClick={() =>
                            navigate(
                                `/projects/${project.id}`
                            )}
                        style={{
                            border: "1px solid gray",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "15px",
                            cursor: "pointer"
                        }}
                    >

                        <h3>
                            {project.projectName}
                        </h3>

                        <p>
                            {project.description}
                        </p>

                        {
                            role === "ADMIN"
                            && token && (

                                <button
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        deleteProject(
                                            project.id
                                        );
                                    }}
                                >
                                    Delete Project
                                </button>
                            )
                        }

                    </div>
                ))
            }

        </div>
    );
}

export default Projects;