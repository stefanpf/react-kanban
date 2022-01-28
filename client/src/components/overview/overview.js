import Board from "../kanban/board";

export default function Overview() {
    return (
        <div className="board-overview">
            <Board className="board-to-do" />
            <Board className="board-in-progress" />
            <Board className="board-done" />
        </div>
    );
}
