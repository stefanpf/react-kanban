import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModal, toggleModalVisibility } from "../../redux/modal/slice";
import KanBanBoard from "../kanban/kanBanBoard";

export default function Project() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const project = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter(
                    (project) => project.projectId == id
                )[0]) ||
            {}
    );

    const handleSettingsClick = () => {
        dispatch(
            setActiveModal({
                modalType: { type: "projectSettingsView", projectId: id },
            })
        );
        dispatch(toggleModalVisibility());
    };
    return (
        <div className="project-container">
            {project && (
                <div className="project-view-header">
                    <h1>Project Title: {project.name}</h1>
                    <div className="project-view-header-buttons">
                        <button onClick={handleSettingsClick}>Settings</button>
                    </div>
                </div>
            )}
            <KanBanBoard projectId={id} />
        </div>
    );
}
