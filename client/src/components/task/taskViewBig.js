import { useSelector, useDispatch } from "react-redux";
import { setActiveModal } from "../../redux/modal/slice";

export default function TaskViewBig(props) {
    const { taskId } = props;
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

    const handleClick = () => {
        dispatch(
            setActiveModal({ modalType: { type: "editTaskForm", taskId } })
        );
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
                    <button onClick={handleClick}>Edit</button>
                </div>
            )}
        </>
    );
}
