import { useState } from "react";
import useForm from "../../hooks/useForm";
import { toggleModalVisibility } from "../../redux/modal/slice";
import { useDispatch } from "react-redux";

export default function NewTaskForm(props) {
    const { projectId } = props;
    const dispatch = useDispatch();
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState();

    const submit = function (e) {
        e.preventDefault();
        const newTask = { ...userInput, projectId: parseInt(projectId) };
        fetch("/api/task/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    dispatch(toggleModalVisibility());
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(`Error on POST to /api/task/new:`, err);
                setError(true);
            });
    };

    return (
        <div>
            <h2>Add New Task</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <label htmlFor="titleInput">Title:</label>
                <input
                    id="titleInput"
                    type="text"
                    name="title"
                    placeholder="title"
                    required
                    onChange={handleChange}
                ></input>
                <label htmlFor="descriptionInput">Description:</label>
                <textarea
                    id="descriptionInput"
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                />
                <label htmlFor="dueDateInput">Due Date:</label>
                <input
                    id="dueDateInput"
                    type="date"
                    name="due_date"
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit} className="button-cta">
                    Create Task
                </button>
            </form>
        </div>
    );
}
