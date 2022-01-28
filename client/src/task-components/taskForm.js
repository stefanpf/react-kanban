import useForm from "../hooks/useForm";
import useFormSubmit from "../hooks/useFormSubmit";

export default function TaskForm() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/api/task/", userInput);

    return <h1>This is a TaskForm component</h1>;
}
