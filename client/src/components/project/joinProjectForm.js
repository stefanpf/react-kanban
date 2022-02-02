import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";
import { addMemberToProject } from "../../redux/projects/slice";
// import { socket } from "../../socket";

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
                console.log(data);
                if (data.success) {
                    dispatch(toggleModalVisibility());
                    // socket.emit("joinProject");
                    dispatch(
                        addMemberToProject({
                            projectId: data.projectId,
                            userId: data.userId,
                        })
                    );
                    history.replace(`/project/${data.projectId}`);
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
