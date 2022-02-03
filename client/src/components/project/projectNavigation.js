import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProjectNavigation(props) {
    const { userId } = props;
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
                <button className="project-link-icon project-link-overview">
                    My Tasks
                </button>
            </Link>
            {projects &&
                projects.map((project, index) => (
                    <Link key={index} to={`/project/${project.projectId}`}>
                        <button className="project-link-icon">
                            {project.name}
                        </button>
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
