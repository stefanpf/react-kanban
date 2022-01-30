import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";
import NewTaskForm from "../task/newTaskForm";
import EditTaskForm from "../task/editTaskForm";
import TaskViewBig from "../task/taskViewBig";

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
                {modalType.type === "newTaskForm" && <NewTaskForm />}
                {modalType.type === "editTaskForm" && (
                    <EditTaskForm taskId={modalType.taskId} />
                )}
                {modalType.type === "taskViewBig" && (
                    <TaskViewBig taskId={modalType.taskId} />
                )}

                <button onClick={handleClick} className="close-modal-button">
                    X
                </button>
            </div>
        </>
    );
}