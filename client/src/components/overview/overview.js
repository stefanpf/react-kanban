import { useSelector } from "react-redux";
import Board from "../kanban/board";

export default function Overview() {
    const { userId } = useSelector((state) => state.userData || {});
    return (
        <div className="board-overview">
            <h1>This is the userId from redux: {userId}</h1>
            <Board className="board-to-do" />
            <Board className="board-in-progress" />
            <Board className="board-done" />
        </div>
    );
}
