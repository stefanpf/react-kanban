import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useFormSubmit from "../../hooks/useFormSubmit";

export default function Registration() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/api/register", userInput);

    return (
        <>
            <h1>Registration</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="what should we call you?"
                        required
                        onChange={handleChange}
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        onChange={handleChange}
                    ></input>
                    <input
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
                    Click here to <strong>log in!</strong>
                </Link>
            </div>
        </>
    );
}
