import { DragDropContext } from "react-beautiful-dnd";
import BoardColumn from "../kanban/boardColumn";

export default function Overview() {
    const handleDragEnd = (result) => {
        // this function needs to update the state to reflect the
        // result of the drag and drop action
        console.log("onDragEnd result:", result);
    };

    return (
        <div className="board-overview">
            <DragDropContext onDragEnd={handleDragEnd}>
                <BoardColumn key="todo" type="todo" />
                <BoardColumn key="inprogress" type="inprogress" />
                <BoardColumn key="done" type="done" />
            </DragDropContext>
        </div>
    );
}
