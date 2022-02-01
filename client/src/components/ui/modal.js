import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";
import NewTaskForm from "../task/newTaskForm";
import EditTaskForm from "../task/editTaskForm";
import TaskViewBig from "../task/taskViewBig";
import NewProjectForm from "../project/newProjectForm";
import EditProjectForm from "../project/editProjectForm";
import JoinProjectForm from "../project/joinProjectForm";
import ProjectSettingsView from "../project/projectSettingsView";
import ProjectMembersView from "../project/projectMembersView";

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
                {modalType.type === "newTaskForm" && (
                    <NewTaskForm projectId={modalType.projectId} />
                )}
                {modalType.type === "editTaskForm" && (
                    <EditTaskForm taskId={modalType.taskId} />
                )}
                {modalType.type === "taskViewBig" && (
                    <TaskViewBig taskId={modalType.taskId} />
                )}
                {modalType.type === "newProjectForm" && <NewProjectForm />}
                {modalType.type === "joinProjectForm" && <JoinProjectForm />}
                {modalType.type === "projectSettingsView" && (
                    <ProjectSettingsView projectId={modalType.projectId} />
                )}
                {modalType.type === "projectMembersView" && (
                    <ProjectMembersView projectId={modalType.projectId} />
                )}
                {modalType.type === "editProjectForm" && (
                    <EditProjectForm projectId={modalType.projectId} />
                )}
                <button onClick={handleClick} className="close-modal-button">
                    X
                </button>
            </div>
        </>
    );
}
