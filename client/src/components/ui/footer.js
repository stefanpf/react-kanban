import { toggleModalVisibility, setActiveModal } from "../../redux/modal/slice";
import { useDispatch } from "react-redux";

export default function Footer() {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setActiveModal({ modalType: { type: "privacyPolicy" } }));
        dispatch(toggleModalVisibility());
    };

    return (
        <>
            <div className="footer-col footer-col-left">
                <div className="footer-copyright">
                    &copy; 2022 Stefan Pfeuffer
                </div>
            </div>

            <div className="footer-col footer-col-right">
                <div className="footer-link" onClick={handleClick}>
                    Privacy Policy
                </div>
                <div className="footer-link">
                    <a
                        href="https://github.com/stefanpf/react-kanban"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/img/external-link.svg" />
                        Source
                    </a>
                </div>
            </div>
        </>
    );
}
