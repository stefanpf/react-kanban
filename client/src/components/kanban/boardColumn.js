import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TaskViewSmall from "../task/taskViewSmall";

export default function BoardColumn(props) {
    const { type } = props;
    const columnTypeMap = {
        todo: {
            style: "board-to-do",
            status: 1,
        },
        inprogress: {
            style: "board-in-progress",
            status: 2,
        },
        done: {
            style: "board-done",
            status: 3,
        },
    };
    const tasks = useSelector((state) => {
        if (state.tasks) {
            return state.tasks.filter((task) => {
                return task.status == columnTypeMap[type].status;
            });
        } else {
            return {};
        }
    });

    return (
        <Droppable droppableId={type}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-board ${columnTypeMap[type].style}`}
                >
                    {tasks && tasks.length
                        ? tasks.map((task, index) => {
                              return (
                                  <TaskViewSmall
                                      key={index}
                                      taskId={task.taskId}
                                      index={index}
                                  />
                              );
                          })
                        : ""}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
