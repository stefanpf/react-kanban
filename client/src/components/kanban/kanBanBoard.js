import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import BoardColumn from "./boardColumn";
import { updateTask } from "../../redux/tasks/slice";

export default function KanBanBoard(props) {
    const { projectId } = props;
    const [error, setError] = useState(false);
    const tasks = useSelector((state) => {
        if (state.tasks) {
            return state.tasks.filter((task) => {
                if (projectId) {
                    return task.projectId == projectId;
                } else {
                    return task;
                }
            });
        } else {
            return [];
        }
    });
    const dispatch = useDispatch();
    const statusMap = { todo: 1, inprogress: 2, done: 3 };

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        const task = tasks.filter((task) => task.taskId == draggableId)[0];

        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newTask = {
            ...task,
            status: statusMap[destination.droppableId],
        };

        // non-optimistic dispatch led to janky UX where the
        // task jumped around while waiting for the fetch
        // to finish
        dispatch(updateTask(newTask));

        fetch(`/api/task/${newTask.taskId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.success) {
                    dispatch(updateTask(task));
                    setError(true);
                }
            });
    };

    return (
        <div className="board-overview">
            {error && <h2>Oops, something went wrong...</h2>}
            <DragDropContext onDragEnd={handleDragEnd}>
                <BoardColumn projectId={projectId} key="todo" type="todo" />
                <BoardColumn
                    projectId={projectId}
                    key="inprogress"
                    type="inprogress"
                />
                <BoardColumn projectId={projectId} key="done" type="done" />
            </DragDropContext>
        </div>
    );
}
