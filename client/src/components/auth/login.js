import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useFormSubmit from "../../hooks/useFormSubmit";

export default function Login() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/api/login", userInput);

    return (
        <>
            <h1>Login</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div>
                <form>
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
                        Login
                    </button>
                </form>
            </div>
            <div className="auth-switch-text">
                Don&apos;t have an account yet?{" "}
                <Link to="/">
                    Click here to <strong>register!</strong>
                </Link>
            </div>
        </>
    );
}
