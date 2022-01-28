import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

export default function TaskViewSmall(props) {
    const { taskId, index } = props;
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId == taskId)) ||
            {}
    )[0];

    return (
        <Draggable draggableId={taskId.toString()} index={index}>
            {(provided) => (
                <div
                    className="task-view-small"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="task-view-sm-title">{task.title}</div>
                    <div>{task.dueDate}</div>
                </div>
            )}
        </Draggable>
    );
}
