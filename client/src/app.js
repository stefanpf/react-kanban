import { BrowserRouter, Route } from "react-router-dom";
import Header from "./ui-components/header";
import Overview from "./overview-components/overview";
import NewTaskForm from "./task-components/newTaskForm";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Route path="/task">
                <NewTaskForm />
            </Route>
            <Route exact path="/">
                <Overview />
            </Route>
        </BrowserRouter>
    );
}
