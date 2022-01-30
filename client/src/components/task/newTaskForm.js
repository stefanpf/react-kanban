import useForm from "../../hooks/useForm";
import useTaskFormSubmit from "../../hooks/useTaskFormSubmit";

export default function NewTaskForm() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useTaskFormSubmit(userInput);

    return (
        <div>
            <h2>Add A New Task</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    required
                    onChange={handleChange}
                ></input>
                <textarea
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="due_date"
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit}>
                    Create Task
                </button>
            </form>
        </div>
    );
}
