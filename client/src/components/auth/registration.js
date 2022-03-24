import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useFormSubmit from "../../hooks/useFormSubmit";

export default function Registration() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/api/register", userInput);

    return (
        <div className="logged-out-form-card">
            <h1>Registration</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div>
                <form>
                    <label htmlFor="nameInput">Name:</label>
                    <input
                        id="nameInput"
                        type="text"
                        name="name"
                        placeholder="what should we call you?"
                        required
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        id="emailInput"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="passwordInput">Password:</label>
                    <input
                        id="passwordInput"
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={handleChange}
                    ></input>
                    <button
                        type="submit"
                        onClick={submit}
                        className="button-cta"
                    >
                        Register
                    </button>
                </form>
            </div>
            <div className="auth-switch-text">
                Already registered?{" "}
                <Link to="/login">
                    <span className="logged-out-link">
                        Click here to <strong>log in!</strong>
                    </span>
                </Link>
            </div>
        </div>
    );
}
