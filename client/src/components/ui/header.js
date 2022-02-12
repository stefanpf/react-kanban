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
        <header>
            {/* <div className="header-notifications">0</div> */}
            <div className="header-welcome">
                <h1>WeKanBan!</h1>
            </div>
            <div className="header-nav">
                <div className="header-button">
                    <button name="my-account" onClick={handleClick}>
                        My Account
                    </button>
                </div>
                <div className="header-button">
                    <a href="/logout">
                        <button>Logout</button>
                    </a>
                </div>
            </div>
        </header>
    );
}
