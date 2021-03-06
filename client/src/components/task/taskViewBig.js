import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import DeleteTaskButton from "./deleteTaskButton";

export default function TaskViewBig(props) {
    const { taskId } = props;
    const { userId } = useSelector((state) => state.userData || 0);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId === taskId))[0] || []
    );
    const ownTask = userId === task.taskOwnerId;
    const statusMap = {
        1: "To Do",
        2: "In Progress",
        3: "Done",
        4: "Archived",
    };
    if (task.dueDate) {
        var formattedDueDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(task.dueDate)
        );
    }

    const handleEdit = () => {
        dispatch(
            setActiveModal({ modalType: { type: "editTaskForm", taskId } })
        );
    };

    const handleArchive = () => {
        fetch(`/api/task/${taskId}/archive`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: task.projectId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(toggleModalVisibility());
                } else {
                    setError(true);
                }
            });
    };

    return (
        <>
            {task && (
                <div className="task-view-big-container">
                    <div className="task-view-big-title">{task.title}</div>
                    <div className="task-view-big-description">
                        {task.description}
                    </div>
                    <div className="task-view-big-sub-heading">
                        Responsible:
                    </div>
                    <div className="task-view-big-sub-content">
                        {task.ownerName}
                    </div>
                    <div className="task-view-big-sub-heading">Due On:</div>
                    <div className="task-view-big-sub-content">
                        {task.dueDate
                            ? formattedDueDate
                            : "(no due date specified)"}
                    </div>
                    <div className="task-view-big-sub-heading">Status:</div>
                    <div className="task-view-big-sub-content">
                        {statusMap[task.status]}
                    </div>
                    {error && <div>Oops, something went wrong...</div>}
                    {ownTask && (
                        <div className="task-view-big-buttons">
                            <button onClick={handleEdit}>Edit</button>
                            {task.status === 3 && (
                                <button onClick={handleArchive}>Archive</button>
                            )}
                            <DeleteTaskButton
                                taskId={taskId}
                                ownerId={task.ownerId}
                                projectId={task.projectId}
                                callback={(err) => {
                                    if (err) {
                                        setError(true);
                                    } else {
                                        dispatch(toggleModalVisibility());
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
