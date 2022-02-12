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
        <div className="project-navigation-col">
            <Link to="/">
                <div
                    className={`project-link-icon-container ${
                        activeProject == 0 && "project-link-active"
                    }`}
                >
                    <button className="project-link-icon project-link-overview">
                        My Tasks
                    </button>
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
                            <button className="project-link-icon">
                                {project.name}
                            </button>
                        </div>
                    </Link>
                ))}
            <Link to="/new-project">
                <div className="project-link-icon">
                    <button className="add-button-small add-new-task-button">
                        +
                    </button>
                </div>
            </Link>
        </div>
    );
}
