export default function DeleteTaskButton(props) {
    const { taskId, ownerId, projectId, callback } = props;

    const handleDelete = () => {
        fetch(`/api/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
                ownerId: ownerId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    callback(null, taskId);
                } else {
                    callback(true, taskId);
                }
            })
            .catch(() => callback(true, taskId));
    };

    return <button onClick={handleDelete}>Delete</button>;
}
