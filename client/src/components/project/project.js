import { useParams } from "react-router";
import KanBanBoard from "../kanban/kanBanBoard";

export default function Project() {
    const { id } = useParams();

    return (
        <div className="project-container">
            {id && <h1>This is the page for Project {id}</h1>}
            <KanBanBoard projectId={id} />
        </div>
    );
}
