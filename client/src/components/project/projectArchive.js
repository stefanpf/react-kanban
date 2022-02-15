import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProjectArchive(props) {
    const { projectId } = props;
    const { userId } = useSelector((state) => state.userData || {});
    let archivedTasks;

    useEffect(() => {
        fetch(`/api/project/${projectId}/archive`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    archivedTasks = data.archivedTasks;
                }
                console.log(archivedTasks);
            });
    }, [projectId]);

    return (
        <div>
            <h1>
                Archive for project {projectId} for user {userId}
            </h1>
        </div>
    );
}
