import KanBanBoard from "../kanban/kanBanBoard";

export default function Overview() {
    return (
        <>
            <div>Overview component</div>
            <div>
                this should render a kanban board with all tasks that are owned
                by the logged in user
            </div>
            <KanBanBoard />
        </>
    );
}
