import KanBanBoard from "../kanban/kanBanBoard";

export default function Overview() {
    return (
        <div className="project-container">
            <div className="project-view-header">
                <div className="project-view-header-info">
                    <div className="project-view-header-title">My Tasks:</div>
                </div>
            </div>
            <KanBanBoard />
        </div>
    );
}
