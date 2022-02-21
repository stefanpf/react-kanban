import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import useTaskFormSubmit from "../../hooks/useTaskFormSubmit";

export default function EditTaskForm(props) {
    const { taskId } = props;
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId === taskId))[0] || {}
    );
    const [userInput, handleChange] = useForm();
    const [submit, error] = useTaskFormSubmit(userInput, taskId);

    return (
        <div>
            <h2>Edit Task</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <label htmlFor="titleInput">Title:</label>
                <input
                    id="titleInput"
                    type="text"
                    name="title"
                    defaultValue={task.title}
                    required
                    onChange={handleChange}
                ></input>
                <label htmlFor="descriptionInput">Description:</label>
                <textarea
                    id="descriptionInput"
                    name="description"
                    defaultValue={task.description}
                    onChange={handleChange}
                />
                <label htmlFor="dueDateInput">Due Date:</label>
                <input
                    id="dueDateInput"
                    type="date"
                    name="dueDate"
                    defaultValue={
                        task.dueDate
                            ? new Date(task.dueDate).toISOString().substr(0, 10)
                            : ""
                    }
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit} className="button-cta">
                    Save
                </button>
            </form>
        </div>
    );
}
