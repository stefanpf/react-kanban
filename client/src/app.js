import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/ui/header";
import Modal from "./components/ui/modal";
import KanBanBoard from "./components/kanban/kanBanBoard";
import NewTaskForm from "./components/task/newTaskForm";
import { receiveUserData } from "./redux/user_data/slice";
import { receiveTasks } from "./redux/tasks/slice";
import { receiveModalVisibility } from "./redux/modal/slice";

export default function App(props) {
    const { userId } = props;
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const modalIsVisible = useSelector(
        (state) => (state.modal && state.modal.modalIsVisible) || false
    );

    useEffect(() => {
        dispatch(receiveUserData({ userId }));
        dispatch(receiveModalVisibility({ modalIsVisible: false }));
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
            {modalIsVisible && <Modal />}
            <Route path="/task">
                <NewTaskForm />
            </Route>
            <Route exact path="/">
                <KanBanBoard />
            </Route>
        </BrowserRouter>
    );
}
