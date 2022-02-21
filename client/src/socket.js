import { io } from "socket.io-client";
import {
    addTask,
    updateTask,
    deleteTask,
    archiveTask,
    deleteTasks,
    removeTasksFromProjectByMemberId,
} from "./redux/tasks/slice";
import {
    updateProject,
    addMemberToProject,
    removeMemberFromProject,
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

        socket.on("archiveTask", (taskId) => {
            store.dispatch(archiveTask(taskId));
        });

        socket.on("updateProject", (updatedProject) =>
            store.dispatch(
                updateProject(updatedProject.id, updatedProject.project)
            )
        );

        socket.on("deleteProject", (projectId) => {
            store.dispatch(deleteTasks(projectId));
            store.dispatch(deleteProject(projectId));
        });

        socket.on("addMemberToProject", (payload) => {
            store.dispatch(addMemberToProject(payload));
        });

        socket.on("removeMemberFromProject", (payload) => {
            store.dispatch(removeTasksFromProjectByMemberId(payload));
            store.dispatch(removeMemberFromProject(payload));
        });
    }
};
