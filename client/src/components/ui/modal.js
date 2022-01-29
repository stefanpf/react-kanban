import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";
import NewTaskForm from "../task/newTaskForm";

export default function Modal(props) {
    const dispatch = useDispatch();

    const handleOverlayClick = () => {
        dispatch(toggleModalVisibility());
    };

    return (
        <>
            <div className="overlay" onClick={handleOverlayClick}></div>
            <div className="modal"></div>
        </>
    );
}
