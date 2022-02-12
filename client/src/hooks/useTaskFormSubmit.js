import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility } from "../redux/modal/slice";

export default function useTaskFormSubmit(userInput, taskId = null) {
    let url;
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    if (taskId) {
        const task = useSelector(
            (state) =>
                state.tasks &&
                state.tasks.filter((task) => task.taskId === taskId)[0]
        );
        userInput = { ...task, ...userInput };
        url = `/api/task/${taskId}`;
    } else {
        url = "/api/task/new";
    }

    const submit = function (e) {
        e.preventDefault();
        fetch(url, {
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
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(`Error on POST to ${url}:`, err);
                setError(true);
            });
    };

    return [submit, error];
}
