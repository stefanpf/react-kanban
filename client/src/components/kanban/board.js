export default function Board(props) {
    const { className: progressStyle } = props;
    return (
        <div className={`kanban-board ${progressStyle}`}>
            This is a kanban board
        </div>
    );
}
