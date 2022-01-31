import { useParams } from "react-router";

export default function Project() {
    const { id } = useParams();
    return (
        <div className="project-container">
            {id && <h1>This is the page for Project {id}</h1>}
        </div>
    );
}
