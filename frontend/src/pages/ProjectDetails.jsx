import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProjectDetails({ role }) {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [deadline, setDeadline] = useState("");

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            const projectResponse =
                await api.get(`/projects/${id}`);

            setProject(projectResponse.data);

            const response =
                await api.get(`/tasks/project/${id}`);

            setTasks(response.data);

            const usersResponse =
                await api.get("/users");

            setUsers(usersResponse.data);

        } catch (error) {

            console.error(error);
        }
    };

    const createTask = async () => {

        try {

            await api.post("/tasks", {

                title,
                description,
                status: "TODO",
                priority,
                deadline,

                project: {
                    id
                }
            });

            fetchTasks();

            setTitle("");
            setDescription("");
            setPriority("");
            setDeadline("");

        } catch (error) {

            console.error(error);
        }
    };

    const assignTask = async (
        taskId,
        userId
    ) => {

        if (!userId) {

            alert("Please select user");

            return;
        }

        try {

            await api.put(
                `/tasks/${taskId}/assign/${userId}`
            );

            fetchTasks();

        } catch (error) {

            console.error(error);
        }
    };

    const updateStatus = async (
        taskId,
        status
    ) => {

        try {

            await api.put(
                `/tasks/${taskId}/status`,
                { status }
            );

            fetchTasks();

        } catch (error) {

            console.error(error);
        }
    };

    const deleteTask = async (taskId) => {

        try {

            await api.delete(`/tasks/${taskId}`);

            fetchTasks();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Project Details</h1>

            {
                project && (

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>
                            {project.projectName}
                        </h2>

                        <p>
                            {project.description}
                        </p>

                        <p>
                            Start Date:
                            {" "}
                            {project.startDate}
                        </p>

                        <p>
                            End Date:
                            {" "}
                            {project.endDate}
                        </p>

                    </div>
                )
            }

            {
                role === "ADMIN" && (

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h2>Create Task</h2>

                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)}
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
                                setDescription(e.target.value)}
                            style={{
                                display: "block",
                                marginBottom: "10px"
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Priority"
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)}
                            style={{
                                display: "block",
                                marginBottom: "10px"
                            }}
                        />

                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(e.target.value)}
                            style={{
                                display: "block",
                                marginBottom: "10px"
                            }}
                        />

                        <button onClick={createTask}>
                            Create Task
                        </button>

                    </div>
                )
            }

            <h2>Tasks</h2>

            {
                tasks.map(task => (

                    <div
                        key={task.id}
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "10px",
                            borderRadius: "10px"
                        }}
                    >

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            Priority: {task.priority}
                        </p>

                        <p>
                            Deadline: {task.deadline}
                        </p>

                        <p
                            style={{
                                color:
                                    task.status === "DONE"
                                        ? "green"
                                        : task.status === "IN_PROGRESS"
                                            ? "orange"
                                            : "red"
                            }}
                        >
                            Status: {task.status}
                        </p>

                        <p>
                            Assigned User:
                            {" "}
                            {
                                task.assignedUser
                                    ? task.assignedUser.name
                                    : "Not Assigned"
                            }
                        </p>

                        <div
                            style={{
                                marginTop: "10px"
                            }}
                        >

                            {
                                task.assignedUser &&
                                task.assignedUser.name.toLowerCase() ===
                                localStorage
                                    .getItem("email")
                                    ?.split("@")[0]
                                    ?.toLowerCase() && (

                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                task.id,
                                                e.target.value
                                            )}
                                    >

                                        <option value="TODO">
                                            TODO
                                        </option>

                                        <option value="IN_PROGRESS">
                                            IN_PROGRESS
                                        </option>

                                        <option value="DONE">
                                            DONE
                                        </option>

                                    </select>
                                )
                            }

                            {
                                role === "ADMIN" && (

                                    <>
                                        <select
                                            value={selectedUser}
                                            onChange={(e) =>
                                                setSelectedUser(
                                                    e.target.value
                                                )}
                                            style={{
                                                marginLeft: "10px"
                                            }}
                                        >

                                            <option value="">
                                                Select User
                                            </option>

                                            {
                                                users.map(user => (

                                                    <option
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        {user.name}
                                                    </option>
                                                ))
                                            }

                                        </select>

                                        <button
                                            onClick={() =>
                                                assignTask(
                                                    task.id,
                                                    selectedUser
                                                )}
                                            style={{
                                                marginLeft: "10px"
                                            }}
                                        >
                                            Assign
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteTask(task.id)}
                                            style={{
                                                marginLeft: "10px"
                                            }}
                                        >
                                            Delete Task
                                        </button>
                                    </>
                                )
                            }

                        </div>

                    </div>
                ))
            }

        </div>
    );
}

export default ProjectDetails;