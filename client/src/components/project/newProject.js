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
        <div className="project-container new-project-choice">
            <div>
                <button className="button-cta" onClick={handleClick}>
                    Start New Project
                </button>
            </div>
            <div>
                <button className="button-cta" onClick={handleClick}>
                    Join Project
                </button>
            </div>
        </div>
    );
}
