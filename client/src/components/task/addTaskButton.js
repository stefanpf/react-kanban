import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";

export default function AddTaskButton() {
    const dispatch = useDispatch();
    const handleClick = () => {
        console.log("user wants to add a task");
        dispatch(toggleModalVisibility());
    };

    return (
        <button
            className="add-button add-button-small add-new-task-button"
            onClick={handleClick}
        >
            +
        </button>
    );
}
