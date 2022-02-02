import { io } from "socket.io-client";
import { addTask, updateTask, deleteTask } from "./redux/tasks/slice";
import {
    updateProject,
    addMemberToProject,
    deleteProject,
} from "./redux/projects/slice";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("newTask", (newTask) => store.dispatch(addTask(newTask)));

        socket.on("updateTask", (updatedTask) =>
            store.dispatch(updateTask(updatedTask))
        );

        socket.on("deleteTask", (taskId) => {
            store.dispatch(deleteTask(taskId));
        });

        socket.on("updateProject", (updatedProject) =>
            store.dispatch(
                updateProject(updatedProject.id, updatedProject.project)
            )
        );

        socket.on("deleteProject", (projectId) => {
            store.dispatch(deleteProject(projectId));
        });

        socket.on("addMemberToProject", (payload) => {
            console.log("addMemberToProject", payload);
            store.dispatch(
                addMemberToProject({
                    projectId: payload.projectId,
                    userId: payload.userId,
                })
            );
        });
    }
};
