import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";

export default function EditProjectForm(props) {
    const { projectId } = props;
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const project = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter(
                    (project) => project.projectId == projectId
                )[0]) ||
            {}
    );

    const submit = function (e) {
        e.preventDefault();
        if (!userInput) {
            dispatch(toggleModalVisibility());
            return;
        }
        const editedProject = {
            ownerId: project.ownerId,
            name: project.name,
            description: project.description,
            logo: project.logo,
            ...userInput,
        };
        fetch(`/api/project/${projectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedProject),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    dispatch(toggleModalVisibility());
                    history.replace(`/project/${projectId}`);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(`Error on POST to /api/project/:id:`, err);
                setError(true);
            });
    };

    return (
        <div>
            <h2>Edit Project {project.name}</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <input
                    type="text"
                    name="name"
                    defaultValue={project.name}
                    required
                    onChange={handleChange}
                ></input>
                <textarea
                    name="description"
                    defaultValue={project.description}
                    onChange={handleChange}
                />
                <button type="submit" onClick={submit} className="button-cta">
                    Edit Project
                </button>
            </form>
        </div>
    );
}
