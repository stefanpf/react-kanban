import Board from "../kanban/board";

export default function Overview() {
    return (
        <div className="board-overview">
            <Board type="todo" />
            <Board type="inprogress" />
            <Board type="done" />
        </div>
    );
}
