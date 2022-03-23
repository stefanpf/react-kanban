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
                <>
                    <div className="project-view-header">
                        <div className="project-view-header-title">
                            {project.name}
                        </div>
                        <div className="project-view-header-nav">
                            <div className="project-view-nav-link">
                                <img
                                    src="/img/settings-icon.svg"
                                    alt="Project Settings"
                                    title="Project Settings"
                                    name="Settings"
                                    onClick={handleClick}
                                />
                            </div>
                            <div className="project-view-nav-link">
                                <img
                                    src="/img/users-icon.svg"
                                    alt="Project Members"
                                    title="Project Members"
                                    name="Members"
                                    onClick={handleClick}
                                />
                            </div>
                            <div className="project-view-nav-link">
                                <img
                                    src="/img/archive-icon.svg"
                                    alt="Project Archive"
                                    title="Project Archive"
                                    name="Archive"
                                    onClick={handleClick}
                                />
                            </div>
                        </div>
                    </div>
                    {project.description && (
                        <div className="project-view-description">
                            {project.description}
                        </div>
                    )}
                </>
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
