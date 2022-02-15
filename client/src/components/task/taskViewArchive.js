export default function TaskViewArchive(props) {
    const { task, userId, handleDelete } = props;
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
                    <button
                        onClick={() => handleDelete(task.id, task.owner_id)}
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
}
