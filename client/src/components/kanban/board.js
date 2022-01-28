import { useSelector } from "react-redux";
import TaskViewSmall from "../task/taskViewSmall";

export default function Board(props) {
    const { type } = props;
    const boardTypeMap = {
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
                return task.status == boardTypeMap[type].status;
            });
        } else {
            return {};
        }
    });

    return (
        <div className={`kanban-board ${boardTypeMap[type].style}`}>
            {tasks && tasks.length
                ? tasks.map((task, index) => {
                      return <TaskViewSmall key={index} taskId={task.taskId} />;
                  })
                : ""}
        </div>
    );
}
