import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./auth-components/registration";

export default function Welcome() {
    return (
        <div className="logged-out-wrapper">
            <h1>Welcome To Our Site</h1>
            <BrowserRouter>
                <Route exact path="/">
                    <Registration />
                </Route>
            </BrowserRouter>
        </div>
    );
}
