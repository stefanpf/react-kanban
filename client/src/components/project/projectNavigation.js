import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProjectNavigation(props) {
    const { userId } = props;
    const location = useLocation();
    const activeProject =
        location.pathname === "/"
            ? 0
            : location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
    const projects = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter((project) =>
                    project.members.includes(userId)
                )) ||
            []
    );

    return (
        <>
            <Link to="/">
                <div
                    className={`project-link-icon-container ${
                        activeProject == 0 && "project-link-active"
                    }`}
                    title="My Tasks Overview"
                >
                    <div className="project-link-icon project-link-overview">
                        <img
                            src="/img/overview-icon.png"
                            alt="My Task Overview"
                        />
                    </div>
                </div>
            </Link>
            {projects &&
                projects.map((project, index) => (
                    <Link key={index} to={`/project/${project.projectId}`}>
                        <div
                            className={`project-link-icon-container ${
                                activeProject == project.projectId &&
                                "project-link-active"
                            }`}
                        >
                            <div className="project-link-icon">
                                {project.name}
                            </div>
                        </div>
                    </Link>
                ))}
            <Link to="/new-project">
                <div
                    className={`project-link-icon-container ${
                        activeProject == "new-project" && "project-link-active"
                    }`}
                    title="New Project"
                >
                    <div className="project-link-icon">
                        <img src="/img/add-new-icon.svg" alt="New Project" />
                    </div>
                </div>
            </Link>
        </>
    );
}
