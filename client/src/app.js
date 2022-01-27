import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <h1>You are logged in!</h1>
            <a href="/logout">Logout</a>
        </BrowserRouter>
    );
}
