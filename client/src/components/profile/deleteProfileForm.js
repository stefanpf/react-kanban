import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../redux/modal/slice";

export default function DeleteProfileForm() {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        if (e.target.name === "cancel") {
            dispatch(toggleModalVisibility());
        } else if (e.target.name === "delete") {
            fetch(`/api/profile`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        location.replace("/");
                    }
                });
        }
    };

    return (
        <div className="text-modal">
            <h1>Are you sure?</h1>
            <div>
                <p>
                    Deleting your account is <strong>permanent</strong> and{" "}
                    <strong>cannot be undone!</strong>
                </p>
                <p>Deleting your account will delete all of the following:</p>
                <ul>
                    <li>
                        every <strong>Project</strong> you own,
                    </li>
                    <li>
                        every <strong>Task</strong> you own or that is connected
                        to a project you own,
                    </li>
                    <li>
                        any <strong>Project Invite Codes</strong>, expired and
                        active, that you created,
                    </li>
                    <li>
                        every piece of information we have stored about you (
                        <strong>
                            Name, Email Address, and Hashed Password
                        </strong>
                        .)
                    </li>
                </ul>
            </div>
            <div className="task-view-big-buttons">
                <button
                    name="cancel"
                    className="cancel-delete-button"
                    onClick={handleClick}
                >
                    Cancel
                </button>
                <button
                    name="delete"
                    className="delete-button"
                    onClick={handleClick}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
