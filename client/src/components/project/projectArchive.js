import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskViewArchive from "../task/taskViewArchive";

export default function ProjectArchive(props) {
    const { projectId } = props;
    const { userId } = useSelector((state) => state.userData || {});
    const [error, setError] = useState(false);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        fetch(`/api/project/${projectId}/archive`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setArchivedTasks(data.archivedTasks);
                }
            });
    }, [projectId]);

    const handleDelete = (taskId, ownerId) => {
        fetch(`/api/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
                ownerId: ownerId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setArchivedTasks(
                        archivedTasks.filter((task) => task.id !== taskId)
                    );
                } else {
                    setError(true);
                }
            });
    };

    return (
        <div className="archive-view-container">
            <h1>Archived Tasks:</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div className="archive-view-inner-container">
                {archivedTasks && archivedTasks.length ? (
                    <table className="archive-view-table">
                        <thead>
                            <tr>
                                <td>Task</td>
                                <td>Archived On</td>
                                <td>Options</td>
                            </tr>
                        </thead>
                        <tbody>
                            {archivedTasks.map((task, index) => {
                                return (
                                    <TaskViewArchive
                                        key={index}
                                        task={task}
                                        userId={userId}
                                        projectId={projectId}
                                        handleDelete={handleDelete}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No tasks archived, yet.</p>
                )}
            </div>
        </div>
    );
}
