import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TaskViewSmall from "../task/taskViewSmall";
import AddTaskButton from "../task/addTaskButton";
import styled from "styled-components";

const Column = styled.div`
    transition: background-color 0.2s ease;
    background-color: ${(props) => {
        if (props.isDraggingOver) return "antiquewhite";
    }};
`;

export default function BoardColumn(props) {
    const { type, projectId } = props;
    const { userId } = useSelector((state) => state.userData || 0);
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
                if (projectId) {
                    return (
                        task.status == columnTypeMap[type].status &&
                        task.projectId == projectId
                    );
                } else {
                    return (
                        task.status == columnTypeMap[type].status &&
                        task.taskOwnerId === userId
                    );
                }
            });
        } else {
            return [];
        }
    });
    const ownTasks = tasks.filter((task) => task.taskOwnerId === userId);
    const foreignTasks = tasks.filter((task) => task.taskOwnerId !== userId);

    return (
        <Droppable droppableId={type}>
            {(provided, snapshot) => (
                <Column
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-board ${columnTypeMap[type].style}`}
                    isDraggingOver={snapshot.isDraggingOver}
                >
                    {ownTasks && ownTasks.length
                        ? ownTasks.map((task, index) => {
                              return (
                                  <TaskViewSmall
                                      key={index}
                                      taskId={task.taskId}
                                      index={index}
                                      ownTask="true"
                                  />
                              );
                          })
                        : ""}
                    {provided.placeholder}
                    {foreignTasks && foreignTasks.length
                        ? foreignTasks.map((task, index) => {
                              return (
                                  <TaskViewSmall
                                      key={index}
                                      taskId={task.taskId}
                                      index={index}
                                  />
                              );
                          })
                        : ""}
                    {type === "todo" && projectId && (
                        <AddTaskButton projectId={projectId} />
                    )}
                </Column>
            )}
        </Droppable>
    );
}
