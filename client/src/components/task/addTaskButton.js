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
        <button
            className="add-button-small add-new-task-button"
            onClick={handleClick}
        >
            +
        </button>
    );
}
