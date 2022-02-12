import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";
import { useDispatch } from "react-redux";

export default function Footer() {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setActiveModal({ modalType: { type: "privacyPolicy" } }));
        dispatch(toggleModalVisibility());
    };

    return (
        <footer>
            <div className="footer-col">
                <div className="footer-copyright">
                    &copy; 2022 Stefan Pfeuffer
                </div>
            </div>

            <div className="footer-col">
                <div className="footer-link" onClick={handleClick}>
                    Privacy Policy
                </div>
                <div>|</div>
                <div className="footer-link">
                    <a
                        href="https://github.com/stefanpf/react-kanban"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Source (GitHub)
                    </a>
                </div>
            </div>
        </footer>
    );
}
