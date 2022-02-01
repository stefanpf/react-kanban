import { io } from "socket.io-client";
import { addTask, updateTask } from "./redux/tasks/slice";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("newTask", (newTask) => store.dispatch(addTask(newTask)));

        socket.on("updateTask", (updatedTask) =>
            store.dispatch(updateTask(updatedTask))
        );
    }
};
