import { useState } from "react";
import useForm from "../../hooks/useForm";
import { toggleModalVisibility } from "../../redux/modal/slice";
import { addTask } from "../../redux/tasks/slice";
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
                    console.log(data.task);
                    dispatch(toggleModalVisibility());
                    dispatch(addTask(data.task));
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
            <h2>Add A New Task to Project {projectId}</h2>
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
