import { useState } from "react";
import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";

export default function EditTaskForm(props) {
    const { taskId } = props;
    const task = useSelector(
        (state) =>
            (state.tasks &&
                state.tasks.filter((task) => task.taskId === taskId))[0] || {}
    );
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);

    return (
        <div>
            <h2>Edit Task {taskId}</h2>
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
