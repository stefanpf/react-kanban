import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/ui/header";
import Overview from "./components/overview/overview";
import NewTaskForm from "./components/task/newTaskForm";

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
