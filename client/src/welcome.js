import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./components/auth/registration";
import Login from "./components/auth/login";

export default function Welcome() {
    return (
        <BrowserRouter>
            <div className="logged-out-wrapper">
                <div className="logged-out-logo">
                    <img src="/img/logo-icon.svg"></img>
                    <h1>WeKanBan</h1>
                </div>
                <div className="logged-out-tagline">
                    Project management made simple.
                </div>
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
