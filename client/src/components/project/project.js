import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import KanBanBoard from "../kanban/kanBanBoard";

export default function Project() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const project = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter(
                    (project) => project.projectId == id
                )[0]) ||
            {}
    );

    const handleClick = (e) => {
        dispatch(
            setActiveModal({
                modalType: {
                    type: `project${e.target.textContent}View`,
                    projectId: id,
                },
            })
        );
        dispatch(toggleModalVisibility());
    };

    return (
        <div className="project-container">
            {project && (
                <div className="project-view-header">
                    <h1>Project Title: {project.name}</h1>
                    <div className="project-view-header-button">
                        <button onClick={handleClick}>Settings</button>
                    </div>
                    <div className="project-view-header-button">
                        <button onClick={handleClick}>Members</button>
                    </div>
                </div>
            )}
            <KanBanBoard projectId={id} />
        </div>
    );
}
