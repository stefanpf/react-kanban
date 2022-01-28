import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/ui/header";
import Overview from "./components/overview/overview";
import NewTaskForm from "./components/task/newTaskForm";
import { receiveUserData } from "./redux/user_data/slice";
import { receiveTasks } from "./redux/tasks/slice";

export default function App(props) {
    const { userId } = props;
    const [error, setError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveUserData({ userId }));
        fetch("/api/tasks")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(receiveTasks(data.tasks));
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    return (
        <BrowserRouter>
            <Header />
            {error && <h2>Oops, something went wrong...</h2>}
            <Route path="/task">
                <NewTaskForm />
            </Route>
            <Route exact path="/">
                <Overview />
            </Route>
        </BrowserRouter>
    );
}
