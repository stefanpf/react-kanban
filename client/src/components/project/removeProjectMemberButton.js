import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toggleModalVisibility } from "../../redux/modal/slice";

export default function RemoveProjectMemberButton(props) {
    const {
        projectId,
        userId,
        ownerId,
        member,
        memberNames,
        setMemberNames,
        setError,
    } = props;
    const userIsProjectOwner = userId === ownerId;
    const dispatch = useDispatch();
    const history = useHistory();

    let textContent, buttonVisible;
    if (userIsProjectOwner && member.id !== ownerId) {
        textContent = "Remove";
        buttonVisible = true;
    } else if (!userIsProjectOwner && userId === member.id) {
        textContent = "Leave";
        buttonVisible = true;
    }

    const removeProjectMember = (id) => {
        fetch(`/api/project/${projectId}/members`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                memberId: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMemberNames(
                        memberNames.filter((member) => member.id !== id)
                    );
                    if (textContent === "Leave") {
                        dispatch(toggleModalVisibility());
                        history.replace("/");
                    }
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    };

    return (
        <>
            {buttonVisible && (
                <button onClick={() => removeProjectMember(member.id)}>
                    {textContent}
                </button>
            )}
        </>
    );
}
