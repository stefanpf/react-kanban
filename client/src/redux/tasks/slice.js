export function tasksReducer(tasks = null, action) {
    if (action.type === "tasks/received") {
        tasks = action.payload;
    } else if (action.type === "tasks/updateTask") {
        return tasks.map((task) => {
            if (task.taskId === action.payload.taskId) {
                return {
                    ...task,
                    ...action.payload,
                };
            }
            return task;
        });
    } else if (action.type === "tasks/addTask") {
        return [...tasks, action.payload];
    } else if (action.type === "tasks/addTasks") {
        return [...tasks, ...action.payload];
    } else if (action.type === "tasks/deleteTask") {
        return tasks.filter((task) => task.taskId !== action.payload);
    } else if (action.type === "tasks/archiveTask") {
        return tasks.map((task) => {
            if (task.taskId === action.payload) {
                return {
                    ...task,
                    status: 4,
                };
            }
            return task;
        });
    } else if (action.type === "tasks/deleteTasks") {
        return tasks.filter((task) => task.projectId !== action.payload);
    } else if (action.type === "tasks/removeTasksFromProjectByMemberId") {
        return tasks.filter((task) => {
            !(
                task.projectId === action.payload.projectId &&
                task.taskOwnerId === action.payload.memberId
            );
        });
    }
    return tasks;
}

export function receiveTasks(tasks) {
    return {
        type: "tasks/received",
        payload: tasks,
    };
}

export function updateTask(task) {
    return {
        type: "tasks/updateTask",
        payload: task,
    };
}

export function addTask(task) {
    return {
        type: "tasks/addTask",
        payload: task,
    };
}

export function addTasks(tasks) {
    return {
        type: "tasks/addTasks",
        payload: tasks,
    };
}

export function deleteTask(id) {
    return {
        type: "tasks/deleteTask",
        payload: id,
    };
}

export function archiveTask(id) {
    return {
        type: "tasks/archiveTask",
        payload: parseInt(id),
    };
}

export function deleteTasks(projectId) {
    return {
        type: "tasks/deleteTasks",
        payload: projectId,
    };
}

export function removeTasksFromProjectByMemberId(member) {
    return {
        type: "tasks/removeTasksFromProjectByMemberId",
        payload: member,
    };
}
