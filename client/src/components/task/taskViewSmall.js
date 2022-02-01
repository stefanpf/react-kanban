import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import styled from "styled-components";

const OwnTask = styled.div`
    background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

// const ForeignTask = styled.div`
//     background-color: "lightgrey";
// `;

export default function TaskViewSmall(props) {
    const { taskId, index } = props;
    const ownTask = props.ownTask === "true";
    const dispatch = useDispatch();
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId == taskId)) ||
            {}
    )[0];

    const handleClick = () => {
        dispatch(
            setActiveModal({ modalType: { type: "taskViewBig", taskId } })
        );
        dispatch(toggleModalVisibility());
    };

    return ownTask ? (
        <Draggable draggableId={taskId.toString()} index={index}>
            {(provided, snapshot) => (
                <OwnTask
                    className="task-view-small"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    onClick={handleClick}
                >
                    <div className="task-view-sm-title">{task.title}</div>
                    <div>{task.dueDate}</div>
                </OwnTask>
            )}
        </Draggable>
    ) : (
        <div
            className="task-view-small task-view-small-foreign"
            onClick={handleClick}
        >
            <div className="task-view-sm-title">{task.title}</div>
            <div>{task.dueDate}</div>
        </div>
    );
}
