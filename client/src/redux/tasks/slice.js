export function tasksReducer(tasks = null, action) {
    if (action.type === "tasks/received") {
        tasks = action.payload;
    } else if (action.type === "tasks/updateTask") {
        const newTasks = tasks.map((task) => {
            if (task.taskId === action.payload.taskId) {
                return {
                    ...task,
                    ...action.payload,
                };
            }
            return task;
        });
        return newTasks;
    } else if (action.type === "tasks/addTask") {
        return [...tasks, action.payload];
    } else if (action.type === "tasks/deleteTask") {
        const newTasks = tasks.filter((task) => task.taskId !== action.payload);
        return newTasks;
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

export function deleteTask(id) {
    return {
        type: "tasks/deleteTask",
        payload: id,
    };
}
