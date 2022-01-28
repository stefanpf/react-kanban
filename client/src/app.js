import { BrowserRouter, Route } from "react-router-dom";
import Header from "./ui-components/header";
import TaskForm from "./task-components/taskForm";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Route path="/task">
                <TaskForm />
            </Route>
        </BrowserRouter>
    );
}
