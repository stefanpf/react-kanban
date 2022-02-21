import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";
import { addProject } from "../../redux/projects/slice";
import { addTasks } from "../../redux/tasks/slice";
import { socket } from "../../socket";

export default function JoinProjectForm() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        fetch("/api/project/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(toggleModalVisibility());
                    dispatch(addProject(data.project));
                    dispatch(addTasks(data.tasks));
                    socket.emit("joinProject", data.project.projectId);
                    history.replace(`/project/${data.project.projectId}`);
                } else {
                    setError(true);
                }
            });
    };

    return (
        <div>
            <h2>Join An Existing Project</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <label htmlFor="codeInput">Invite Code:</label>
                <input
                    id="codeInput"
                    type="text"
                    name="code"
                    placeholder="your invite code"
                    required
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit} className="button-cta">
                    Join Project
                </button>
            </form>
        </div>
    );
}
