import { useState, useEffect } from "react";

export default function ProjectMembersView(props) {
    const { projectId } = props;
    const [memberNames, setMemberNames] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/project/${projectId}/members`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data);
                    setMemberNames(data.memberNames);
                } else {
                    setError(true);
                }
            });
    }, [projectId]);

    console.log(memberNames);
    return (
        <div className="members-view-big-container">
            <h1>Project Members</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div className="members-view-members-table">
                {memberNames && memberNames.length
                    ? memberNames.map((member, index) => {
                          <div key={index}>
                              <div className="member-name">
                                  Member Name goes here
                              </div>
                          </div>;
                      })
                    : ""}
            </div>
        </div>
    );
}
