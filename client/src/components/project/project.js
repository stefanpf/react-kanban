import { useParams } from "react-router";
import NewProject from "./newProject";

export default function Project(props) {
    const { newProject } = props;
    const { id } = useParams();
    return (
        <div className="project-container">
            {id && <h1>This is the page for Project {id}</h1>}
            {newProject === "new" && <NewProject />}
        </div>
    );
}
