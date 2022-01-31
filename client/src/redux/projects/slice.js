export function projectsReducer(projects = null, action) {
    if (action.type === "projects/received") {
        projects = action.payload;
    } else if (action.type === "projects/addProject") {
        return [...projects, action.payload];
    }
    return projects;
}

export function receiveProjects(projects) {
    return {
        type: "projects/received",
        payload: projects,
    };
}

export function addProject(project) {
    return {
        type: "projects/addProject",
        payload: project,
    };
}
