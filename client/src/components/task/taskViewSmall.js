import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import styled from "styled-components";

const OwnTask = styled.div`
    background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

export default function TaskViewSmall(props) {
    const { taskId, index, projectId } = props;
    const ownTask = props.ownTask === "true";
    const dispatch = useDispatch();
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId == taskId)) ||
            {}
    )[0];

    if (!projectId && task) {
        const project = useSelector(
            (state) =>
                (state.projects &&
                    state.projects.filter(
                        (project) => project.projectId == task.projectId
                    )[0]) ||
                []
        );
        var projectName = project.name;
    }

    const handleClick = () => {
        dispatch(
            setActiveModal({ modalType: { type: "taskViewBig", taskId } })
        );
        dispatch(toggleModalVisibility());
    };

    if (task.dueDate) {
        var formattedDueDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(task.dueDate)
        );
    }

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
                    {task.dueDate && (
                        <div className="task-view-sm-due-date">
                            <em>Due:</em> {formattedDueDate}
                        </div>
                    )}
                    <div className="task-view-sm-owner">
                        <em>Responsible:</em> {task.ownerName}
                    </div>
                    {!projectId && projectName && (
                        <div className="task-view-sm-project-name">
                            <em>Project:</em> {projectName}
                        </div>
                    )}
                </OwnTask>
            )}
        </Draggable>
    ) : (
        <div
            className="task-view-small task-view-small-foreign"
            onClick={handleClick}
        >
            <div className="task-view-sm-title">{task.title}</div>
            {task.dueDate && (
                <div className="task-view-sm-due-date">
                    <em>Due: {formattedDueDate}</em>
                </div>
            )}
            <div className="task-view-sm-owner">
                <em>Responsible: {task.ownerName}</em>
            </div>
        </div>
    );
}
