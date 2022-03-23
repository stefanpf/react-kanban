import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";
import { addProfileData } from "../../redux/user_data/slice";
import { useDispatch } from "react-redux";

export default function Header() {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        if (e.target.name === "my-account") {
            fetch("/api/profile")
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        dispatch(addProfileData(data.profileData));
                        dispatch(
                            setActiveModal({ modalType: { type: "profile" } })
                        );
                        dispatch(toggleModalVisibility());
                    }
                });
        }
    };

    return (
        <>
            <div className="header-logo">
                <img src="/img/logo-icon.svg"></img>
                <h1>WeKanBan</h1>
            </div>
            <div className="header-nav">
                <div className="header-link" title="My Account">
                    <img
                        src="/img/profile-icon.svg"
                        alt="My Account"
                        name="my-account"
                        onClick={handleClick}
                    ></img>
                </div>
                <div className="header-link" title="Logout">
                    <a href="/logout">
                        <img
                            src="/img/logout-icon.svg"
                            alt="Logout"
                            className="logout-icon"
                        ></img>
                    </a>
                </div>
            </div>
        </>
    );
}
