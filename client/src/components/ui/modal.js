import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";
import NewTaskForm from "../task/newTaskForm";

export default function Modal() {
    const dispatch = useDispatch();
    const modalType = useSelector(
        (state) => (state.modal && state.modal.modalType) || {}
    );

    const handleClick = () => {
        dispatch(setActiveModal({ modalType: "" }));
        dispatch(toggleModalVisibility());
    };

    return (
        <>
            <div className="overlay" onClick={handleClick}></div>
            <div className="modal">
                {modalType === "newTaskForm" && <NewTaskForm />}
                <button onClick={handleClick} className="close-modal-button">
                    X
                </button>
            </div>
        </>
    );
}
