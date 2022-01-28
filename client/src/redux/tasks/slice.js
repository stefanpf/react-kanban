export function tasksReducer(tasks = null, action) {
    if (action.type == "tasks/received") {
        tasks = action.payload.tasks;
    } else if (action.type == "tasks/updateTask") {
        const newTasks = tasks.map((task) => {
            if (task.taskId === action.payload.task.taskId) {
                return {
                    ...task,
                    status: action.payload.task.status,
                };
            }
            return task;
        });
        return newTasks;
    }
    return tasks;
}

export function receiveTasks(tasks) {
    return {
        type: "tasks/received",
        payload: {
            tasks,
        },
    };
}

export function updateTask(task) {
    return {
        type: "tasks/updateTask",
        payload: {
            task,
        },
    };
}
