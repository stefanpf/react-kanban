import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";
import { addProject } from "../../redux/projects/slice";
import { socket } from "../../socket";

export default function NewProjectForm() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const submit = function (e) {
        e.preventDefault();
        fetch("/api/project/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    dispatch(toggleModalVisibility());
                    dispatch(addProject(data.project));
                    socket.emit("joinProject", data.project.projectId);
                    history.replace(`/project/${data.project.projectId}`);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(`Error on POST to /api/project/new:`, err);
                setError(true);
            });
    };

    return (
        <div>
            <h2>Create A New Project</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    required
                    onChange={handleChange}
                ></input>
                <textarea
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                />
                <button type="submit" onClick={submit} className="button-cta">
                    Create Project
                </button>
            </form>
        </div>
    );
}
