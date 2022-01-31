import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";
// import { updateProject } from "../../redux/projects/slice";

export default function NewProjectForm() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

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
                    console.log(data);
                    dispatch(toggleModalVisibility());
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
                <input
                    type="text"
                    name="code"
                    placeholder="your invite code"
                    required
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit}>
                    Join Project
                </button>
            </form>
        </div>
    );
}
