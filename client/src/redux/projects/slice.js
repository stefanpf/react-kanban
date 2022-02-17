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
    } else if (action.type === "projects/deleteProject") {
        return projects.filter(
            (project) => project.projectId !== action.payload
        );
    } else if (action.type === "projects/addMemberToProject") {
        return projects.map((project) => {
            if (project.projectId == action.payload.projectId) {
                const members = [...project.members, action.payload.memberId];
                return { ...project, members };
            } else {
                return project;
            }
        });
    } else if (action.type === "projects/removeMemberFromProject") {
        return projects.map((project) => {
            if (project.projectId === action.payload.projectId) {
                const members = project.members.filter(
                    (member) => member !== action.payload.memberId
                );
                return { ...project, members };
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

export function deleteProject(id) {
    return {
        type: "projects/deleteProject",
        payload: id,
    };
}

export function addMemberToProject(member) {
    return {
        type: "projects/addMemberToProject",
        payload: member,
    };
}

export function removeMemberFromProject(member) {
    return {
        type: "projects/removeMemberFromProject",
        payload: member,
    };
}
