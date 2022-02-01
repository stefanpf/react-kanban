export function projectsReducer(projects = null, action) {
    if (action.type === "projects/received") {
        projects = action.payload;
    } else if (action.type === "projects/addProject") {
        return [...projects, action.payload];
    } else if (action.type === "projects/updateProject") {
        return projects.map((project) => {
            if (project.projectId == action.payload.id) {
                return { ...project, ...action.payload.project };
            } else {
                return project;
            }
        });
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

export function updateProject(id, project) {
    return {
        type: "projects/updateProject",
        payload: { id, project },
    };
}
