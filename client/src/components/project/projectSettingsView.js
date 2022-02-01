import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";
import { toggleModalVisibility } from "../../redux/modal/slice";

export default function ProjectSettingsView(props) {
    const { projectId } = props;
    const userId = useSelector(
        (state) => (state.userData && state.userData.userId) || {}
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState(false);
    const project = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter(
                    (project) => project.projectId == projectId
                )[0]) ||
            {}
    );
    const handleEdit = () => {
        console.log("user wants to edit project");
    };

    const handleDelete = () => {
        fetch(`/api/project/${projectId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ownerId: project.ownerId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(toggleModalVisibility());
                    history.replace("/");
                }
            })
            .catch(() => setError(true));
    };

    return (
        <>
            {project && (
                <div className="task-view-big-container">
                    <div className="task-view-big-title">{project.name}</div>
                    <div className="task-view-big-description">
                        {project.description}
                    </div>
                    <div className="task-view-big-sub-heading">
                        Responsible:
                    </div>
                    <div className="task-view-big-sub-content">
                        {project.projectOwnerId}
                    </div>
                    {error && <div>Oops, something went wrong...</div>}
                    <button onClick={handleEdit}>Edit</button>
                    {project.ownerId == userId && (
                        <button onClick={handleDelete}>Delete</button>
                    )}
                </div>
            )}
        </>
    );
}
