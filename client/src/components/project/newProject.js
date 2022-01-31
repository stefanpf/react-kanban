import { useDispatch } from "react-redux";
import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";

export default function NewProject() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setActiveModal({ modalType: { type: "newProjectForm" } }));
        dispatch(toggleModalVisibility());
    };

    return (
        <div className="project-container">
            <h1>This is the page for New Project</h1>
            <button className="new-project-button" onClick={handleClick}>
                <div className="new-project-button-content">
                    <h1>Start New Project</h1>
                </div>
            </button>
        </div>
    );
}
