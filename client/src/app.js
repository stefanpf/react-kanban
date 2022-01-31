import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/ui/header";
import Modal from "./components/ui/modal";
import ProjectNavigation from "./components/project/projectNavigation";
import Overview from "./components/project/overview";
import Project from "./components/project/project";
import NewProject from "./components/project/newProject";
import { receiveUserData } from "./redux/user_data/slice";
import { receiveTasks } from "./redux/tasks/slice";
import { receiveProjects } from "./redux/projects/slice";
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
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(receiveProjects(data.projects));
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    return (
        <BrowserRouter>
            <Header />
            {modalIsVisible && <Modal />}
            <div className="main-container">
                <div className="main-container-left-col">
                    <ProjectNavigation userId={userId} />
                </div>
                <div className="main-container-right-col">
                    {error && <h2>Oops, something went wrong...</h2>}
                    <Route path="/new-project">
                        <NewProject />
                    </Route>
                    <Route path="/project/:id">
                        <Project />
                    </Route>
                    <Route exact path="/">
                        <Overview />
                    </Route>
                </div>
            </div>
        </BrowserRouter>
    );
}
