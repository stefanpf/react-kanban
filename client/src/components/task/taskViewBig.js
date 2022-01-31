import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import { deleteTask } from "../../redux/tasks/slice";

export default function TaskViewBig(props) {
    const { taskId } = props;
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId === taskId))[0] || {}
    );

    const statusMap = {
        1: "To Do",
        2: "In Progress",
        3: "Done",
        4: "Archived",
    };

    const handleEdit = () => {
        dispatch(
            setActiveModal({ modalType: { type: "editTaskForm", taskId } })
        );
    };

    const handleDelete = () => {
        fetch(`/api/task/${taskId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(deleteTask(taskId));
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
                        {task.taskOwnerId}
                    </div>
                    <div className="task-view-big-sub-heading">Due On:</div>
                    <div className="task-view-big-sub-content">
                        {task.dueDate
                            ? task.dueDate
                            : "(no due date specified)"}
                    </div>
                    <div className="task-view-big-sub-heading">Status:</div>
                    <div className="task-view-big-sub-content">
                        {statusMap[task.status]}
                    </div>
                    {error && <div>Oops, something went wrong...</div>}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </>
    );
}
