import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Task = styled.div`
    background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

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
            {(provided, snapshot) => (
                <Task
                    className="task-view-small"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div className="task-view-sm-title">{task.title}</div>
                    <div>{task.dueDate}</div>
                </Task>
            )}
        </Draggable>
    );
}
