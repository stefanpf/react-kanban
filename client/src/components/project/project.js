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
    console.log(project);
    return (
        <div className="project-container">
            {project && (
                <div className="project-view-header">
                    <div className="project-view-header-info">
                        <div className="project-view-header-title">
                            {project.name}
                        </div>
                        {project.description && (
                            <div className="project-view-header-description">
                                {project.description}
                            </div>
                        )}
                    </div>
                    <div className="project-view-header-nav">
                        <div className="project-view-header-button">
                            <button onClick={handleClick}>Settings</button>
                        </div>
                        <div className="project-view-header-button">
                            <button onClick={handleClick}>Members</button>
                        </div>
                    </div>
                </div>
            )}
            <KanBanBoard projectId={id} />
        </div>
    );
}
