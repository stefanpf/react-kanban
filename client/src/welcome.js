import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./components/auth/registration";
import Login from "./components/auth/login";

export default function Welcome() {
    return (
        <BrowserRouter>
            <div className="logged-out-wrapper">
                <h1>Welcome To Our Site</h1>
                <Route exact path="/">
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </div>
        </BrowserRouter>
    );
}
