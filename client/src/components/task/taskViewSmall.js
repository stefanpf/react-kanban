import { useSelector } from "react-redux";

export default function TaskViewSmall(props) {
    const { taskId } = props;
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId == taskId)) ||
            {}
    )[0];

    return (
        <div className="task-view-small">
            {task.taskId} {task.title}
        </div>
    );
}
