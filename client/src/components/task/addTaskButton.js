import { useDispatch } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";

export default function AddTaskButton(props) {
    const { projectId } = props;
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(
            setActiveModal({ modalType: { type: "newTaskForm", projectId } })
        );
        dispatch(toggleModalVisibility());
    };

    return (
        <div className="project-link-icon new-task-button">
            <img
                src="/img/add-new-icon.svg"
                alt="New Task"
                title="New Task"
                onClick={handleClick}
            />
        </div>
    );
}
