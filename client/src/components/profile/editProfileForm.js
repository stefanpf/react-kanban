import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toggleModalVisibility } from "../../redux/modal/slice";
import { addProfileData } from "../../redux/user_data/slice";
import useForm from "../../hooks/useForm";

export default function EditProfileForm() {
    const { profileData } = useSelector((state) => state.userData || {});
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const submit = (e) => {
        e.preventDefault();
        if (userInput) {
            const updatedProfileData = { ...profileData, ...userInput };
            fetch("/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfileData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        dispatch(addProfileData(updatedProfileData));
                        dispatch(toggleModalVisibility());
                    } else {
                        setError(true);
                    }
                })
                .catch(() => setError(true));
        } else {
            dispatch(toggleModalVisibility());
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {error && <h3>Oops, something went wrong...</h3>}
            <form>
                <label htmlFor="nameInput">Name:</label>
                <input
                    id="nameInput"
                    type="text"
                    name="name"
                    defaultValue={profileData.name}
                    required
                    onChange={handleChange}
                ></input>
                <label htmlFor="emailInput">Email:</label>
                <input
                    id="emailInput"
                    type="email"
                    name="email"
                    defaultValue={profileData.email}
                    onChange={handleChange}
                ></input>
                <button type="submit" onClick={submit} className="button-cta">
                    Save
                </button>
            </form>
        </div>
    );
}
