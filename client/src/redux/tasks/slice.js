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
    console.log("tasks in slice action creator:", tasks);
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
