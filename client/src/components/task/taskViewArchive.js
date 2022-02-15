import DeleteTaskButton from "./deleteTaskButton";

export default function TaskViewArchive(props) {
    const { task, userId, projectId, handleDelete } = props;
    const ownTask = task.owner_id === userId;

    return (
        <tr>
            <td>{task.title}</td>
            <td>
                {new Intl.DateTimeFormat("en-GB").format(
                    new Date(task.archived_on)
                )}
            </td>
            <td>
                {ownTask && (
                    <DeleteTaskButton
                        taskId={task.id}
                        ownerId={task.owner_id}
                        projectId={projectId}
                        callback={(err, taskId) => handleDelete(err, taskId)}
                    />
                )}
            </td>
        </tr>
    );
}
