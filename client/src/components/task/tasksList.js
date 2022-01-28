import { useEffect, useState } from "react";
import TaskViewBig from "./taskViewBig";

export default function TasksList() {
    const [error, setError] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`/api/tasks`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTasks(data.tasks);
                }
            })
            .catch(() => setError(true));
    }, []);

    return (
        <div>
            <h2>This is the TasksList</h2>
            {error && <h2>Oops, something went wrong...</h2>}
            {tasks.length > 0 &&
                tasks.map((task, index) => (
                    <TaskViewBig key={index} taskId={task.taskId} />
                ))}
        </div>
    );
}
