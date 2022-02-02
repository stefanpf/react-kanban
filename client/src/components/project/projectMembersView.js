import { useState, useEffect } from "react";

export default function ProjectMembersView(props) {
    const { projectId } = props;
    const [memberNames, setMemberNames] = useState([]);
    const [inviteCodes, setInviteCodes] = useState([]);
    const [error, setError] = useState(false);

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

    const handleClick = () => {
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

    return (
        <div className="task-view-big-container">
            <h1>Project Members</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div className="members-view-members-table">
                {memberNames && memberNames.length
                    ? memberNames.map((member, index) => (
                          <div
                              key={index}
                              className="members-view-members-table-entry"
                          >
                              <div className="members-table-member-name">
                                  {member.name}
                              </div>
                          </div>
                      ))
                    : "No members, yet (except for me)"}
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
                <button onClick={handleClick} className="button-cta">
                    Create Invite Code
                </button>
            </div>
        </div>
    );
}
