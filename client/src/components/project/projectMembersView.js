import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeMemberFromProject } from "../../redux/projects/slice";

export default function ProjectMembersView(props) {
    const { projectId } = props;
    const [memberNames, setMemberNames] = useState([]);
    const [inviteCodes, setInviteCodes] = useState([]);
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const { userId } = useSelector((state) => state.userData || {});
    const { ownerId } = useSelector(
        (state) =>
            (state.projects &&
                state.projects.filter(
                    (project) => project.projectId == projectId
                )[0]) ||
            {}
    );
    const userIsProjectOwner = userId === ownerId;

    useEffect(() => {
        fetch(`/api/project/${projectId}/members`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMemberNames(data.memberNames);
                } else {
                    setError(true);
                }
            });

        fetch(`/api/project/${projectId}/invites`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setInviteCodes(data.codes);
                } else {
                    setError(true);
                }
            });
    }, [projectId]);

    const createInviteCode = () => {
        fetch(`/api/project/${projectId}/invites`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setInviteCodes([...inviteCodes, data.code]);
                } else {
                    setError(true);
                }
            });
    };

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
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    };

    return (
        <div className="task-view-big-container">
            <h1>Project Members</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div className="members-view-members-table">
                {memberNames && memberNames.length
                    ? memberNames.map((member) => (
                          <div
                              key={member.id}
                              className="members-view-members-table-entry"
                          >
                              <div className="members-table-member-name">
                                  {member.id === userId ? "Me" : member.name}{" "}
                                  {member.id === ownerId
                                      ? "(Project Owner)"
                                      : ""}{" "}
                                  {userIsProjectOwner &&
                                  member.id !== ownerId ? (
                                      <button
                                          onClick={() =>
                                              removeProjectMember(member.id)
                                          }
                                      >
                                          Remove
                                      </button>
                                  ) : (
                                      ""
                                  )}
                              </div>
                          </div>
                      ))
                    : ""}
            </div>
            <div className="invite-codes-table">
                <div className="invite-codes-table-header">Invite Codes:</div>
                {inviteCodes && inviteCodes.length
                    ? inviteCodes.map((code) => (
                          <div
                              key={code.code}
                              className="invite-codes-table-entry"
                          >
                              <div className="invite-codes-code">
                                  {code.code}
                              </div>{" "}
                              <div className="invite-codes-expires">
                                  expires on{" "}
                                  {new Intl.DateTimeFormat("en-GB").format(
                                      new Date(code.expiresOn)
                                  )}
                              </div>
                          </div>
                      ))
                    : "No active invite codes"}
                <button onClick={createInviteCode} className="button-cta">
                    Create Invite Code
                </button>
            </div>
        </div>
    );
}
