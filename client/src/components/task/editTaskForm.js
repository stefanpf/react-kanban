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
            <h2>Edit Task {taskId}</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <input
                    type="text"
                    name="title"
                    defaultValue={task.title}
                    required
                    onChange={handleChange}
                ></input>
                <textarea
                    name="description"
                    defaultValue={task.description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dueDate"
                    defaultValue={new Date(task.dueDate)
                        .toISOString()
                        .substr(0, 10)}
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit} className="button-cta">
                    Save
                </button>
            </form>
        </div>
    );
}
