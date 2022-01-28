export function tasksReducer(tasks = null, action) {
    if (action.type == "tasks/received") {
        tasks = action.payload.tasks;
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
