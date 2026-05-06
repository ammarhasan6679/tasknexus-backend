import { useEffect, useState } from "react";
import api from "../services/api";

function MemberDashboard() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            const response =
                await api.get("/tasks/project/1");

            const assignedTasks =
                response.data.filter(task =>
                    task.assignedUser &&
                    task.assignedUser.id === 1
                );

            setTasks(assignedTasks);

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

    return (

        <div style={{ padding: "20px" }}>

            <h1>Member Dashboard</h1>

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

                        <h2>{task.title}</h2>

                        <p>{task.description}</p>

                        <p>
                            Priority: {task.priority}
                        </p>

                        <p>
                            Deadline: {task.deadline}
                        </p>

                        <p>
                            Status: {task.status}
                        </p>

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

                    </div>
                ))
            }

        </div>
    );
}

export default MemberDashboard;