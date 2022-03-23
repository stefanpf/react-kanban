import KanBanBoard from "../kanban/kanBanBoard";

export default function Overview() {
    return (
        <div className="project-container">
            <div className="project-view-header">
                <div className="project-view-header-title">My Tasks:</div>
            </div>
            <div className="project-view-description">
                This is an overview of all your tasks from all your projects.
            </div>
            <KanBanBoard />
        </div>
    );
}
