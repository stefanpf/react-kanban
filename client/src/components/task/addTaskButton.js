import { useDispatch } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";

export default function AddTaskButton() {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setActiveModal({ modalType: "newTaskForm" }));
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
