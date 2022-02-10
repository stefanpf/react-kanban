import { useSelector, useDispatch } from "react-redux";
import { setActiveModal } from "../../redux/modal/slice";

export default function Profile() {
    const { profileData } = useSelector((state) => state.userData || {});
    const dispatch = useDispatch();
    const handleClick = (e) => {
        if (e.target.name === "edit") {
            dispatch(
                setActiveModal({ modalType: { type: "editProfileForm" } })
            );
        }
    };

    return (
        <div className="task-view-big-container">
            <div className="task-view-big-title">My Account</div>
            {/* <div className="task-view-big-description"></div> */}
            <div className="task-view-big-sub-heading">My name:</div>
            <div className="task-view-big-sub-content">{profileData.name}</div>
            <div className="task-view-big-sub-heading">My email address:</div>
            <div className="task-view-big-sub-content">{profileData.email}</div>
            <div className="task-view-big-sub-heading"></div>
            <div className="task-view-big-sub-content"></div>
            {/* {error && <div>Oops, something went wrong...</div>} */}
            <div className="task-view-big-buttons">
                <button name="edit" onClick={handleClick}>
                    Edit
                </button>
                {/* <button
                    name="delete"
                    onClick={handleClick}
                    className="delete-button"
                >
                    Delete
                </button> */}
            </div>
        </div>
    );
}
