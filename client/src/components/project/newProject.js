import { useDispatch } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";

export default function NewProject() {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        const type =
            e.target.textContent === "Join Project"
                ? "joinProjectForm"
                : "newProjectForm";
        dispatch(setActiveModal({ modalType: { type } }));
        dispatch(toggleModalVisibility());
    };

    return (
        <div className="project-container">
            <button className="new-project-button" onClick={handleClick}>
                Start New Project
            </button>
            <button className="new-project-button" onClick={handleClick}>
                Join Project
            </button>
        </div>
    );
}
