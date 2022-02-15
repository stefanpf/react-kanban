import { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import KanBanBoard from "../kanban/kanBanBoard";
import ProjectArchive from "./projectArchive";

export default function Project() {
    const { id } = useParams();
    const [showArchive, setShowArchive] = useState(false);
    const dispatch = useDispatch();
    const project = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter(
                    (project) => project.projectId == id
                )[0]) ||
            {}
    );

    const toggleShowArchive = () => {
        setShowArchive(!showArchive);
    };

    const handleClick = (e) => {
        const action = e.target.name;
        if (action === "Settings" || action === "Members") {
            dispatch(
                setActiveModal({
                    modalType: {
                        type: `project${action}View`,
                        projectId: id,
                    },
                })
            );
            dispatch(toggleModalVisibility());
        } else if (action === "Archive") {
            toggleShowArchive();
        }
    };

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
                            <button name="Settings" onClick={handleClick}>
                                Settings
                            </button>
                        </div>
                        <div className="project-view-header-button">
                            <button name="Members" onClick={handleClick}>
                                Members
                            </button>
                        </div>
                        <div className="project-view-header-button">
                            <button name="Archive" onClick={handleClick}>
                                Archive
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!showArchive && <KanBanBoard projectId={id} />}
            {showArchive && (
                <ProjectArchive
                    projectId={id}
                    handleUnmount={toggleShowArchive}
                />
            )}
        </div>
    );
}
